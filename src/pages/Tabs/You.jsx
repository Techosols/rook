import React, {useState} from 'react'

function You() {
  const [open, SetOpen] = useState (false)
  return (
   <section>
     <div className='bg-background dark:bg-background-dark dark:text-white h-[700px]'>
      <div className='container mx-auto max-w-[1200px] p-4 '>
        <button onClick={() => SetOpen (!open)}></button>
        {open &&(
          <ul>
            <a href="">Your Info<li></li></a>
            <a href=""><li>Your Pictures</li></a>
            <a href=""><li>About You</li></a>
            <a href=""><li>Your Hobbies, Pets, etc.</li></a>
          </ul>
        )}
      </div>
    </div>
    <div className='flex justify-center items-center '>
      <div>
         <div className='w-full max-w-[750px]'>
        <p>In this page, you provide info about yourself that can be used by others in filters, to include/exclude you 
            in their matches.</p>
            <h1>You</h1>
      </div>
      <div>
        <form action="">
          <div className='flex'>
            <div className='flex'>
            <label htmlFor="">Preferred Name</label>
            <input type="text" />
          </div>
          <div className='flex'>
            <label htmlFor="">Age</label>
            <input type="text" />
          </div>
          </div>
           <div className='flex'>
            <div className='flex'>
            <label htmlFor="">Zip Code</label>
            <input type="text" />
          </div>
          <div className='flex'>
            <label htmlFor="">Hight</label>
            <select>
              <option value="">7</option>
              <option value="">6</option>
              <option value="">5</option>
            </select>
            <select>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
            </select>
          </div>
          
          </div>
          <div className='flex'>
            <div className='flex'>
            <label htmlFor="">Moniker</label>
            <input type="text" />
          </div>
          <div className='flex'>
            <label htmlFor="">Weight</label>
            <select>
              <option value="">7</option>
              <option value="">6</option>
              <option value="">5</option>
            </select>
          </div>
          
          </div>
          <div className='flex'>
            <div className='flex'>
            <label htmlFor="">RelationshipTypes</label>
            <input type="checkbox" />
            <label htmlFor="">Platonic Friendship</label>
            <div>
              <input type="checkbox" />
            <label htmlFor="">Short-term</label>
            </div>
          </div>
          </div>
          <button>Save</button>
        </form>
      </div>
      <div>
        <div>
          <h1>About You</h1>
        </div>
        <form action="">
          <div className='flex'>
            <div className='flex'>
              <label htmlFor="">Gender</label>
              <select name="" id="">
                <option value="">Male</option>
                <option value="">Femlae</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      </div>
    </div>
   </section>
  )
}

export default You