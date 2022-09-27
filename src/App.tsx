import './styles/App.scss'
import ContentArea from './components/ContentArea'
import logo from './assets/uow.png'
import user from './assets/user.png'
import { BsGear } from 'react-icons/bs'
import { NavMenu } from './Constants/NavMenu'
import { useState } from 'react'

function App() {

  const [pagetitle, setPageTitle] = useState(NavMenu[0].name)
  const [content, setContent] = useState(NavMenu[0].content)

  const handleChangeTab = (e: React.MouseEvent<HTMLDivElement>, name: string, newContent: JSX.Element) => {
    setPageTitle(name)
    setContent(newContent)
  }

  return (
    <main className="main__wrapper">
      <nav className="topnav__wrapper">
        <section className="flex-1 flex justify-start">
          <img src={logo} alt='uwindsor logo' />
        </section>

        {/* <section className='flex-1 flex justify-center items-center'>
          <input type='text' placeholder='Search' className='searchbar' />
        </section> */}

        <section className="flex-1 flex justify-end items-center gap-2">
          <BsGear className='icons' />
          <img src={user} alt='user pfp' className='pfp'/>
        </section>
        
      </nav>

      <div className="bottomportion__wrapper">

          <nav className="leftnav__wrapper">
            {NavMenu.map(e => {
              return(
                <div className='nav__item' key={e.name} onClick={(el: React.MouseEvent<HTMLDivElement>) => handleChangeTab(el, e.name, e.content)}>
                  <div className='nav__menuicon'>
                    {e.icon}</div>
                  <div className='nav__menuname'>
                    {e.name}
                  </div>
                </div>
              )
            })}

          </nav>

          <ContentArea pagetitle={pagetitle} content={content} />
      </div>

    </main>
  )
}

export default App
