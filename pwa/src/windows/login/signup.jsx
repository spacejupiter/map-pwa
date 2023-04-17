import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authcontext';

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmationPwd, setConfPwd] = useState('');
	const [error, setError] = useState({
        status : false,
        message : ''
    });
	const [sucess, setSuccess] = useState('');
	const { signup, accessToken } = useContext(AuthContext);

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

	const setConfPasssword = (e) => {
		setConfPwd(e.target.value);
	};
	return (
		<div className='w-[100vw] h-[100vh]  text-white flex justify-center px-4 overflow-x-hidden'>
			<div className='flex flex-col justify-center space-y-4'>
				{error.status===true && (
					<div className='bg-gray-100 py-6 px-4 text-red-400'>
						<p className='font-bold text-center'>{error.message}</p>
					</div>
				)}
                {sucess && (
					<div className='bg-gray-100 py-6 px-4 text-green-400'>
						<p className='font-bold text-center'>{sucess}</p>
					</div>
				)}
				<div className='text-center text-[2rem] text-black'>
					<h1 className='text-purple-800 font-bold'> Sign up</h1>
				</div>
				<form
					className='flex flex-col space-y-2'
					onSubmit={() => {
						//signup();
					}}
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
					<label className='text-purple-800'>Re-enter password</label>
					<input
						className='rounded-lg placeholder-black px-24 py-4 text-left text-black border border-2 border-purple-800'
						placeholder='Enter password'
						value={confirmationPwd}
						onChange={setConfPasssword}
					/>
				</form>

				<Link
					className='rounded-lg px-24 py-6 bg-purple-400  text-center text-white'
					onClick={() => {
						if (password !== confirmationPwd) {
							setError({status:true,message:'Password does not match'});
						} else {
                            signup(email, password)
							.then((user) => {
								if (user) {
                                    setError({status:false,message:''});
                                    setSuccess('User created succesfully')
									setTimeout(() => {
										navigate('/');
									}, 1000);
								}
							})
							.catch((e) => {
                                console.log(e.message)
								setError({status:true,message:e.message.substring(22,e.message.length-2)});
							});
						}
						
					}}
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}
export default Signup;
