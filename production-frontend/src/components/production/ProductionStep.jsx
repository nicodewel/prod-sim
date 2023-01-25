import { useState } from "react";

const ProductionStep = ({order}) => {

    const [step, setStep] = useState();
    return (
        <div className="row mb-3">
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Schritt {order}</label>
            <div className="col-sm-4">
                <select className="form-select" aria-label="Default select example" onChange={ (e) => setStep(e.target.value)}>
                    <option defaultValue>Bitte wählen</option>
                    <option value="Roboter">Robotor</option>
                    <option value="Station">Station</option>
                </select>
            </div>
            {step === "Station" ? <div className="col-sm-4">
                <select className="form-select" aria-label="Default select example"  onChange={ (e) => setStep(e.target.value)}>
                    <option defaultValue>Mitarbeiter zuordnen</option>
                    <option value="Mitarbeiter 1">Mitarbeiter 1</option>
                    <option value="Mitarbeiter 2">Mitarbeiter 2</option>
                </select>
            </div> : <div></div>}

            {/* */}
        </div>

    )

}

export default ProductionStep;