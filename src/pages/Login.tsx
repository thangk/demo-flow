
import uwindsorLogo from '../assets/uwindsor_logo.svg'
import uwindsorLogoCTL from '../assets/uwindsor_ctl_logo.gif'
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // alert('login button pressed')
        
        navigate('/')
    }

    return (
        <main className="flex min-w-screen w-full min-h-screen h-full bg-blue-100 relative">

            <form className="flex flex-col gap-12 w-[400px] h-[600px] bg-[#005596] drop-shadow-2xl absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] text-slate-100 p-12 rounded-md shadow-2xl" onSubmit={handleSubmit}>

                {/* <h1 className="w-full p-6 text-center">Logo</h1> */}
                <img className='object-contain h-[168px] rounded-md bg-[#EFEFEF] shadow-xl' src={uwindsorLogoCTL} alt='UWindsor Logo' />

                <section className='flex flex-col gap-4'>
                    <div className="flex flex-col gap-2">
                        <label>UWin ID</label>
                        <input className="shadow-sm max-w-full text-[#005596] focus:ring-blue-100" type='text' />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Password</label>
                        <input className="shadow-sm max-w-full text-[#005596] focus:ring-blue-100" type='password' />
                    </div>
                </section>

                <button className="bg-slate-200 w-fit text-[#005596] px-16 py-2 place-self-center shadow-2xl hover:shadow-none hover:bg-blue-300 hover:text-blue-800 font-bold rounded-md" type='submit'>Login</button>

            </form>


        </main>
    )};

export default Login;