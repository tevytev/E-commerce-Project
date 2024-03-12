import { useEffect, useState } from "react";
import './RevolvingHeader.css';

export default function RevolvingHeader() {

    const revolve1 = document.getElementById('revolve-1');
    const revolve2 = document.getElementById('revolve-2');
    const revolve3 = document.getElementById('revolve-3');
    const revolve4 = document.getElementById('revolve-4');

    const revolveArr = [revolve1, revolve2, revolve3, revolve4];

    const [currentHeader, setCurrentHeader] = useState();
    const [nextHeader, setNextHeader] = useState();

    var i = -1, howManyTimes = revolveArr.length;

    function revolve() {
    if (revolve1) {

            switch (i) {
                case -1:
                    // console.log(`this is in 0 = ${i}`);
                    // MOVE OUT #0
                    revolveArr[0].style.transform = 'translateY(-35px)';

                    // MOVE IN #1
                    revolveArr[1].style.transform = 'translateY(0)';

                    // rest #3
                    revolve4.classList.add('hidden');
                    revolve4.style.transform = 'translateY(35px)';

                    revolve3.classList.remove('hidden');
                    
                    break;
                case 0:
                    // console.log(`this is in 1 = ${i}`);
                    // MOVE OUT #1
                    revolveArr[1].style.transform = 'translateY(-35px)';

                    // MOVE IN #2
                    revolveArr[2].style.transform = 'translateY(0)';

                    // // reset #0
                    revolve1.classList.add('hidden');
                    revolve1.style.transform = 'translateY(35px)';

                    // // DISPLAY #3
                    revolve4.classList.remove('hidden');
                    break;
                case 1:
                    // console.log(`this is in 2 = ${i}`);

                    // move out #2
                    revolveArr[2].style.transform = 'translateY(-35px)';

                    // move in #3
                    revolveArr[3].style.transform = 'translateY(0)';

                    // // DISPLAY #0
                    revolve1.classList.remove('hidden');

                    // reset #1
                    revolve2.classList.add('hidden');
                    revolve2.style.transform = 'translateY(35px)';
                    break;
                case 2: 
                    // console.log(`this is in 3 = ${i}`);
                    // move out
                    revolveArr[3].style.transform = 'translateY(-35px)';

                    // move in
                    revolveArr[0].style.transform = 'translateY(0px)';
                    // // displaying #1
                    revolve2.classList.remove('hidden');

                    // // reset #2
                    // revolveArr.push(revolve3);
                    revolve3.classList.add('hidden');
                    revolve3.style.transform = 'translateY(35px)';
                    break;
                case 3:
                    // console.log(`this is in 4 = ${i}`);

                    break;
            };
            
            
    }
    
    i++;
    if (i <= howManyTimes) {
        setTimeout(revolve, 4000);
    }
    
    if (i === 3) {
        i = -1
    }
    }

    revolve();

    return (
        <>
        <div className="revolving-header-container">
            <div className="revolving-header-wrapper">
            <div className="text">
 <div className="rw-sentence rw-words rw-words-1">
      <span className="font-semibold">FREE STANDARD SHIPPING OVER $75</span>
      <span className="font-semibold">FREE 30-DAY RETURNS POLICY</span>
      <span className="font-semibold">20% STUDENT DISCOUNT</span>
      <span className="font-semibold">SPRING COLLECTION COMING APRIL 2024!</span>
      <span className="font-semibold">BECOME A REWARDS MEMBER!</span>
  </div>
</div>
                {/* <h4 id="revolve-1" className="current-header">FREE STANDARD SHIPPING OVER $75</h4>
                <h4 id="revolve-2" className="next-header">FREE 30-DAY RETURNS POLICY</h4>
                <h4 id="revolve-3" className="next-header">20% STUDENT DISCOUNT</h4>
                <h4 id="revolve-4" className="next-header">SPRING COLLECTION COMING APRIL 2024!</h4> */}
            </div>
        </div>
        </>
    )
}