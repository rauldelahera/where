import React from "react";

import "./Objects.css";

export default function Objects() {

    return (
<div className="objects">

                <form autocomplete="off">
                <label>Vehicle Registration:
                <div class="container">
                <input type="text" name="licenseplate" class="licenseplate" maxlength="7" placeholder="AB 1234"/>
                </div>
                <input type="submit" />
                </label>
                </form>
        
  
<div className="col-md-12">
            <form>
                <label>Tent Location:
                <div class="container">
                <h1 className="emojistyle">🏕️</h1>
                <input type="text" name="tent" class="tentclass" maxlength="7" placeholder="Name"/>
                </div>
                <input type="submit" />
                </label>
            </form>

            <form>
                <label>Bike Location:
                <div class="container">
                <h1 className="emojistyle">🚲</h1>
                <input type="text" name="bike" class="bikeclass" maxlength="7" placeholder="Name"/>
                </div>
                <input type="submit" />
                </label>
            </form>

            <form>
                <label>Gathering Location:
                <div class="container">
                <h1 className="emojistylesmall">🎉</h1> 
                <input type="text" name="gathering" class="gatheringclass" maxlength="7" placeholder="Name"/>
                </div>
                <input type="submit" />
                </label>
            </form>

            <form>
                <label>seating Location:
                <div class="container">
                <h1 className="emojistyle">🏖️</h1> 
                <input type="text" name="seat" class="seatclass" maxlength="7" placeholder="Name"/>
                </div>
                <input type="submit" />
                </label>
            </form>

            <form>
                <label>Picnic Location:
                <div class="container">
                <h1 className="emojistylesmall">🐻</h1>
                <input type="text" name="picnic" class="picnicclass" maxlength="7" placeholder="Name"/>
                </div>
                <input type="submit" />
                </label>
           </form>
          
        
    </div> 
</div>

)}
