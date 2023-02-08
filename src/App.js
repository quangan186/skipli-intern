import search from './assets/search.svg'
function App() {
  return (
    <div className="App">
      <div className="w-full flex flex-col gap-4">
        <form className="flex gap-4 justify-center">
          <input className="w-3/5 border px-4 py-2" type="text" placeholder="Please type your phone number with area code (E.g: +8412345689)" onChange={(e) => console.log(e.target.value)} />
          <button className="bg-blue-500 text-white w-[200px] h-[60px]" type="submit">Get verify code</button>
        </form>
        <form className="flex gap-4 justify-center">
          <input className="w-3/5 border px-4 py-2" type="text" placeholder="Please type verify code" onChange={(e) => console.log(e.target.value)} />
          <button className="bg-red-500 text-white w-[200px] h-[60px]" type="submit">Verify phone number</button>
        </form>
      </div>

      <div className='py-8 px-12'>
        <div className='relative border'>
          <input className="h-[60px] w-full px-4 pr-20" type="text" placeholder="Search Github User" />
          <img src={search} alt="" className='absolute right-0 top-1/2 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2'/>
        </div>

        <div className='my-8'>
          <table>
            <tr>
              <th>Id</th>
              <th>Login</th>
              <th>Avatar URL</th>
              <th>HTML URL</th>
              <th>Public Repos</th>
              <th>Followers</th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
