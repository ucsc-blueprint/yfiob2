import { CareersCardExpanded } from "../CareersCardExpanded/CareersCardExpanded";

export default function CareersExpandedPage(){
    return (<div>
        <div className="flex justify-between w-[60vw]">
            <button>

            </button>
            <p>

            </p>
            <button>
                {'>next'}
            </button>

        </div>
        <CareersCardExpanded 
                careerImages={['https://placehold.co/250x250', 'https://placehold.co/250x250', 'https://placehold.co/250x250']}
                careerName={'ugh'}
                category={"ugh x2"}
                description={"lorem ipsum or whatever"}
                salary={10000}
        />
        
    </div>
    
    );

}