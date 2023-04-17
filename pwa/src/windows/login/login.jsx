import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isError, login, accessToken } = useContext(AuthContext);

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/login';

	useEffect(() => {}, []);

	const setUserEmail = (e) => {
		setEmail(e.target.value);
	};

	const setUserPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className='w-[100vw] h-[100vh]  text-white flex justify-center px-4'>
			

			<div className='flex flex-col justify-center space-y-4'>
            {isError.status ===true && <div className='bg-gray-100 py-6 px-4 text-red-400'>
                <p className='font-bold text-center'>{'credentials incorrect'}</p>
                </div>}
				<div className='text-center text-[2rem] text-black'>
					<h1 className='text-purple-800 font-bold'> Login</h1>
				</div>
				<form
					className='flex flex-col space-y-2'
					
				>
					<label className='text-purple-800'> Email address</label>
					<input
						className='rounded-lg placeholder-black px-24 py-4 text-left border border-2 border-purple-800 text-black'
						placeholder='Enter email address'
						value={email}
						onChange={setUserEmail}
						autoComplete={email}
					/>
					<label className='text-purple-800'> Password</label>
					<input
						className='rounded-lg placeholder-black px-24 py-4 text-left text-black border border-2 border-purple-800'
						placeholder='Enter password'
						value={password}
						onChange={setUserPassword}
					/>
				</form>

				<Link
					className='rounded-lg px-24 py-6 bg-purple-400  text-center text-white'
					onClick={() => {
							login(email, password)
								.then((user) => {
									if(user) {
										navigate(from, { replace: true });
									}
								})
								.catch((e) => {});
					}}>

					Login
				</Link>
                <div className='flex flex-row space-x-2'>
                <span className='text-black'>New user?</span>
                <span className='text-purple-800'><Link to='/signup'> register</Link></span>
                </div>
			</div>
		</div>
	);
}
export default Login;
