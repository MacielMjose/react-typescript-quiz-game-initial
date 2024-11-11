import './AnswerOption.scss';


function AnswerOption({answer}: {answer : string}) {

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p> 
                       {answer}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
