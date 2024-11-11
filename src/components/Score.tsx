import './Score.scss';

function Score() {

    return (
        <>  
            <div className="score">
                <div>
                    <small>Correct</small>
                    <span className="point">0</span>
                    <span>X</span>
                    <span className="point">0</span>
                    <small>Incorrect</small>
                </div>
            </div>
            
        </>
    )
}

export default Score
