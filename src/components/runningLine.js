const screenWidth = window.screen.width

export function RunningLine() {
    let numberOfRepetition = Math.floor(screenWidth/67.38)

    return (
        <div className="running-line-container">
            <div className="forground flex flex-row gap-5">
                {[...Array(numberOfRepetition).keys()].map((i) => (
                    <img key={i} src='/images/svg/myso.svg' alt="._." />
                ))}
            </div>
        </div>
    )
}


