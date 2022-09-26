import './styles/App.scss'
import ContentArea from './components/ContentArea'
import logo from './assets/uow.png'
import kap from './assets/kap.jpg'
import { BsGear } from 'react-icons/bs'
import { NavMenuIcons } from './Constants/MenuIcons'

function App() {

  return (
    <main className="main__wrapper">
      <nav className="topnav__wrapper">
        <section className="flex-1 flex justify-start">
          <img src={logo} alt='uwindsor logo' />
        </section>

        <section className='flex-1 flex justify-center items-center'>
          <input type='text' placeholder='Search' className='searchbar' />
        </section>

        <section className="flex-1 flex justify-end items-center gap-2">
          <BsGear className='icons' />
          <img src={kap} alt='kap pfp' className='pfp'/>
        </section>
        
      </nav>

      <div className="bottomportion__wrapper">

          <nav className="leftnav__wrapper">
            {NavMenuIcons.map(e => {
              return(
                <div className='nav__item' key={e.name}>
                  <div className='nav__menuicon'>
                    {e.icon}</div>
                  <div className='nav__menuname'>
                    {e.name}
                  </div>
                </div>
              )
            })}

          </nav>

          <ContentArea />
      </div>

    </main>
  )
}

export default App
