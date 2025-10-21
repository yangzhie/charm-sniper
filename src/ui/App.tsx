import Collection from "./collection/Collection";

function App() {
  return (
    <>
      <div>
        Charm Sniper v1.0.0
      </div>

      <div className="flex w-screen">
        <div className="w-2/3 text-center align-bottom">
          <p>
            Collections
          </p>
          
          <Collection />
        </div>

        <div className="w-1/3 h-full">
          <div>
            Notifications
          </div>
          <div>
            No charms selected!
          </div>
        </div>
      </div>
    </>
  )
}

export default App
