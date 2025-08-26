

function Loader({containerHeight = "h-96"}) {
  return (
    <div className={`flex justify-center items-center ${containerHeight} bg-background dark:bg-background-dark`}>
        <div className="animate-spin rounded-full border-t-2 border-b-2 border-primary dark:border-primary- p-3">
            <img src="Images/rook.ico" alt="Rook" />
        </div>
    </div>
  )
}

export default Loader