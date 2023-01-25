import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProductionStep from "./ProductionStep";

const NewProduction = () => {

    const [order, setOrder] = useState([1]);

    return (

        <div>
            <h1>Neue Produktionsstraße anlegen</h1>



            <form>
                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-4">
                        <input type="email" className="form-control" id="colFormLabel" placeholder="Produktionsstraßenname" />
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Modell</label>
                    <div className="col-sm-4">
                        <select className="form-select" aria-label="Default select example" >
                            <option defaultValue>Fahrzeugmodell wählen</option>
                            <option value="Roboter">Golf</option>
                            <option value="Station">Tiguan</option>
                        </select>
                    </div>
                </div>

                {order.map((o, i) => <ProductionStep key={i} order={o} />)}


            </form>


            <button onClick={() => setOrder([...order, order[order.length - 1] + 1])}>Schritt hinzufügen</button>
            <button>speichern</button>
            <NavLink to="/"><button>zurück</button></NavLink>

        </div>





    )

}

export default NewProduction;