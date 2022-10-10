import "./DashBoard.css";

function Dashboard(props) {
  console.log(props.SignupProps);
  const { firstName, lastName, email } = props.SignupProps;
  return (
    <div className='Welcomebox'>
      <h3>Welcome {firstName}!</h3>
      <label>First Name</label>
      <div name='firstName' className='bolded'>
        {firstName}
      </div>
      <label>Last Name</label>
      <div className='bolded'>{lastName}</div>
      <label>Email</label>
      <div className='bolded'>{email}</div>
    </div>
  );
}

export default Dashboard;
