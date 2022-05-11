import { useState, useEffect } from 'react';
import Head from 'next/head';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { connect } from 'react-redux';
import Navbar from '../components/layout/Navbar';
import Modal from '../components/modal';
import {
  Input,
  Label,
  Select,
  Option,
  Btn,
} from '../components/formComponents';
import Loader from '../components/ui/loader';
import LeaveBalanceBadge from '../components/leaveBalanceBadge';
import {
  fetchLeaveRequests,
  getLeaveById,
  setLeaveModal,
  setSelectedLeave,
  updateLeaveRequest,
  addLeaveRequest,
} from '../redux/actions/leaveActions';

function Calendar(props) {
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    if (props.user !== null) {
      props.fetchLeaveRequests(true);
    }
  }, [props.user]);

  const isAdmin = () => props.user.role === 'admin';

  const colorMap = (status) => {
    switch (status) {
      case 'pending':
        return 'blue';
      case 'rejected':
        return 'red';
      case 'approved':
        return 'green';
      default:
        return 'blue';
    }
  };

  const createLeaveRequest = (info) => {
    // end date should be the last day of the leave, better not include the present day
    const endDate = new Date(info.endStr);
    endDate.setDate(endDate.getDate() - 1);
    endDate.toLocaleString();
    props.setSelectedLeave({
      leave_type: 'sick_leave',
      start_date: info.startStr,
      end_date: endDate,
      status: 'pending',
    });
    setEditModal(false);
    props.setLeaveModal(true);
  };

  const updateLeaveRequestModal = async ({ event }) => {
    const { id } = event;
    props.getLeaveById(id);
    setEditModal(true);
    props.setLeaveModal(true);
  };

  return props.user || props.loading ? (
    <>
      <Head>
        <title>Chitragupta App</title>
        <meta name="description" content="chitragupta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="p-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          events={async () => {
            const leave_requests = props.leave.items;
            return leave_requests.map((leave) => ({
              ...leave,
              start: leave.start_date,
              end: leave.end_date,
              color: colorMap(leave.status),
            }));
          }}
          selectable
          editable
          select={createLeaveRequest}
          eventClick={updateLeaveRequestModal}
        />
      </div>
      {editModal && props.showModal && props.selectedLeave.user && (
        <Modal
          setShowModal={props.setLeaveModal}
          showModal={props.showModal}
          title={`${props.selectedLeave.user.first_name} ${props.selectedLeave.user.last_name}`}
        >
          <div className="flex justify-between">
            <LeaveBalanceBadge
              label="Sick Leave Balance"
              balance={props.selectedLeave.user.sick_leave_balance}
            />
            <LeaveBalanceBadge
              label="Paid Leave Balance"
              balance={props.selectedLeave.user.paid_leave_balance}
            />
            <LeaveBalanceBadge
              label="Unpaid Leave Balance"
              balance={props.selectedLeave.user.unpaid_leave_balance}
            />
          </div>
          <div>
            {props.alerts.message && (
              <span className="text-red-500">
                {JSON.stringify(props.alerts.message)}
              </span>
            )}
            <Label>Leave Type</Label>
            <Select
              onChange={(e) => {
                props.setSelectedLeave({
                  ...props.selectedLeave,
                  leave_type: e.target.value,
                });
              }}
              disabled={isAdmin()}
            >
              <Option
                value="sick_leave"
                selected={props.selectedLeave.leave_type === 'sick_leave'}
              >
                Sick Leave
              </Option>
              <Option
                value="personal"
                selected={props.selectedLeave.leave_type === 'personal'}
              >
                Personal
              </Option>
              <Option
                value="others"
                selected={props.selectedLeave.leave_type === 'others'}
              >
                Others
              </Option>
            </Select>
            <Label>Reason</Label>
            <Input
              onChange={(e) => {
                props.setSelectedLeave({
                  ...props.selectedLeave,
                  title: e.target.value,
                });
              }}
              value={props.selectedLeave.title}
              disabled={isAdmin()}
            />

            {isAdmin() && (
              <>
                <Label>Reply</Label>
                <Input
                  value={
                    props.selectedLeave.reply &&
                    props.selectedLeave.reply.reason
                  }
                  onChange={(e) =>
                    props.setSelectedLeave({
                      ...props.selectedLeave,
                      reply: { reason: e.target.value },
                      reply_attributes: { reason: e.target.value },
                    })
                  }
                />
                {isAdmin() && props.selectedLeave.status !== 'rejected' && (
                  <Btn
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      props.setSelectedLeave({
                        ...props.selectedLeave,
                        status: 'rejected',
                        approver_id: props.user.id,
                      });
                      props.updateLeaveRequest();
                    }}
                  >
                    Reject
                  </Btn>
                )}
                {isAdmin() && props.selectedLeave.status !== 'approved' && (
                  <Btn
                    className="ml-2 bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      props.setSelectedLeave({
                        ...props.selectedLeave,
                        status: 'approved',
                        approver_id: props.user.id,
                      });
                      props.updateLeaveRequest();
                    }}
                  >
                    Approve
                  </Btn>
                )}
              </>
            )}
            {!isAdmin() && (
              <Btn
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => props.updateLeaveRequest()}
              >
                Update
              </Btn>
            )}
          </div>
        </Modal>
      )}

      {!editModal && props.showModal && props.user && (
        <Modal
          setShowModal={props.setLeaveModal}
          showModal={props.showModal}
          title={`${props.user.first_name} ${props.user.last_name}`}
        >
          <div className="flex justify-between">
            <LeaveBalanceBadge
              label="Sick Leave Balance"
              balance={props.user.sick_leave_balance}
            />
            <LeaveBalanceBadge
              label="Paid Leave Balance"
              balance={props.user.paid_leave_balance}
            />
            <LeaveBalanceBadge
              label="Unpaid Leave Balance"
              balance={props.user.unpaid_leave_balance}
            />
          </div>
          <div>
            {props.alerts.message && (
              <span className="text-red-500">
                {JSON.stringify(props.alerts.message)}
              </span>
            )}
            <Label>Leave Type</Label>
            <Select
              onChange={(e) => {
                props.setSelectedLeave({
                  ...props.selectedLeave,
                  leave_type: e.target.value,
                });
              }}
            >
              <Option
                value="sick_leave"
                selected={props.selectedLeave.leave_type === 'sick_leave'}
              >
                Sick Leave
              </Option>
              <Option
                value="personal"
                selected={props.selectedLeave.leave_type === 'personal'}
              >
                Personal
              </Option>
              <Option
                value="others"
                selected={props.selectedLeave.leave_type === 'others'}
              >
                Others
              </Option>
            </Select>
            <Label>Reason</Label>
            <Input
              onChange={(e) => {
                props.setSelectedLeave({
                  ...props.selectedLeave,
                  title: e.target.value,
                });
              }}
              value={props.selectedLeave.title}
            />

            <Btn
              className="bg-blue-500 hover:bg-blue-600"
              onClick={props.addLeaveRequest}
            >
              Submit
            </Btn>
          </div>
        </Modal>
      )}
    </>
  ) : (
    <Loader />
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  leave: state.leave,
  loading: state.leave.loading,
  alerts: state.alerts,
  showModal: state.leave.leaveModal,
  selectedLeave: state.leave.selectedLeave,
});
export default connect(mapStateToProps, {
  fetchLeaveRequests,
  getLeaveById,
  setLeaveModal,
  setSelectedLeave,
  updateLeaveRequest,
  addLeaveRequest,
})(Calendar);
