import React, { useState } from 'react'
import bg from './assets/bg.jpg'

interface UserInterface {
  name: String,
  login: String,
  id: Number,
  avatar_url: String,
  public_repos: Number,
  followers: Number,
  following: Number,
  created_at: String,
  updated_at: String,
  html_url: String
}

interface Alert extends UserInterface {
  clearValue(): void
}

const GithubProfile: React.FC<Alert> = (props) => {
  const { login, avatar_url, followers, following, public_repos, clearValue } = props;

  return (
    <>
      <div className='flex gap-2 justify-center flex-col items-center overflow-hidden bg-white p-5 w-[500px] shadow-lg rounded-lg relative before:absolute before:top-0 before:bottom-0 before:h-[120px] before:w-full before:bg-orange-200 z-0 before:z-[-1]'>
        <div className='w-[200px] h-[200px] rounded-full overflow-hidden shadow-md'>
          <img src={`${avatar_url}`} className='w-full h-full ' />
        </div>
        <div>
          <h1 className='text-center text-3xl font-bold ' >{login}</h1>
          <h3 className='text-center my-2' >@{login}</h3>
        </div>
        <div className='bg-slate-100 w-full h-24 mt-3 flex justify-evenly items-center rounded-md shadow-md'>
          <div className='text-center text-zinc-800 font-bold text-2xl'>{followers.toString()} <br /><span className='text-xl font-light' >followers</span></div>
          <div className='text-center font-bold text-zinc-800 text-2xl'>{following.toString()} <br /><span className='text-xl font-light' >followers</span></div>
          <div className='text-center font-bold text-zinc-800 text-2xl'>{public_repos.toString()} <br /><span className='text-xl font-light' >Repositories</span></div>
        </div>
        <button className='w-full py-3 bg-red-400 
        hover:bg-red-400/90 active:bg-red-500 rounded-md shadow-md mt-3 text-white text-lg font-bold' onClick={clearValue} >Clear</button>
      </div>
    </>
  )
}

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const [wait, setWait] = useState(false);
  const [userData, setUserData] = useState<UserInterface>();

  const clearValue = () => {
    setValue('');
    setUserData(undefined);
    setWait(false);
  }

  const handleSubmit = async () => {
    setWait(true);
    fetch(`https://api.github.com/users/${value}`)
      .then(async (e: Response) => {
        const data = await e.json();
        setWait(false);
        setUserData(data)
      })
  }

  return (
    <>
      <div className='w-full h-screen overflow-hidden relative flex justify-center items-center'>
        {
          userData ? <><GithubProfile {...userData} clearValue={clearValue} /></> : <>
            <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className='bg-white shadow-md rounded-md p-4 '>
              <h1 className='text-center font-bold pb-3 text-xl'>Enter Github username</h1>
              <label htmlFor="name" className='text-lg mr-4'>Enter name</label>
              <input type="text" id='name' value={value} onChange={(e) => { setValue(e.target.value) }} className='border border-dark p-1' />
              <br />
              <input type="button" onClick={handleSubmit} disabled={true} value={`${!wait ? 'submit' : 'submiting...'}`} className='w-full bg-orange-300 hover:bg-orange-200/80 active:bg-orange-300 py-2 rounded-md shadow-sm mt-4' />
            </form>
          </>
        }
        <img src={bg} className='absolute top-0 left-0 z-[-1] h-screen w-screen object-cover' />
      </div >
    </>
  )
}

export default App

// Github API
// https://api.github.com/users/Ayush-may