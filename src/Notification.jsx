const Notification = ({ message }) => {
  if (message === null) return;
  return <div className="message">{message}</div>;
};

export default Notification;
