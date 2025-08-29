
function ProfilePercentageBanner() {
    return (
        <section className="relative bg-[url(Images/bride-groom-their-wedding-ceremony.jpg)] bg-no-repeat bg-cover bg-[center_20%] bg-background dark:bg-background-dark text-text dark:text-text-dark px-4 py-10 ">
            {/* Top white gradient overlay - theme aware */}
            <div className="absolute inset-0 w-full h-full bg-white/80 dark:bg-black/60 pointer-events-none z-0"></div>
            {/* Bottom white gradient overlay - theme aware */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent dark:from-black dark:to-transparent pointer-events-none z-10"></div>
            <div className="container mx-auto flex md:justify-end justify-center items-center gap-10 relative z-10">
                <div className='w-32 h-32 rounded-full bg-primary dark:bg-primary-dark flex items-center justify-center border-2 border-black dark:border-white text-white'>
                    <p className='text-5xl'>{75}% </p>
                </div>
            </div>
        </section>
    )
}

export default ProfilePercentageBanner