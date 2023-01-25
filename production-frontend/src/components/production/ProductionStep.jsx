import { useState } from "react";
import { useSelector } from "react-redux";

const ProductionStep = ({ order }) => {

    const [step, setStep] = useState();


    const robotList = useSelector(state => state.ressources.robots)
    const employeeList = useSelector(state => state.ressources.employees)

    const checkTypeSelection = (t) => {
        switch (t) {
            case "Roboter":
                return (
                    <div className="col-sm-4">
                        <select className="form-select" aria-label="Default select example"  >
                            <option defaultValue>Roboter wählen</option>
                            {robotList?.map((robot,i) => <option key={i} value="Mitarbeiter 1">{robot.name}</option>)}
                        </select>
                    </div>
                );
            case "Station":
                return (
                    <div className="col-sm-4">
                        <select className="form-select" aria-label="Default select example" onChange={(e) => setStep(e.target.value)}>
                            <option defaultValue>Mitarbeiter zuordnen</option>
                            <option value="Mitarbeiter 1">Mitarbeiter 1</option>
                            <option value="Mitarbeiter 2">Mitarbeiter 2</option>
                        </select>
                    </div>
                );
            default:
                return(<div></div>)    
        }

    }

    return (
        <div className="row mb-3">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Schritt {order}</label>
            <div className="col-sm-4">
                <select className="form-select" aria-label="Default select example" onChange={(e) => setStep(e.target.value)}>
                    <option defaultValue>Bitte wählen</option>
                    <option value="Roboter">Roboter</option>
                    <option value="Station">Station</option>
                </select>
            </div>
           {checkTypeSelection(step)}

            {/* */}
        </div>

    )

}

export default ProductionStep;