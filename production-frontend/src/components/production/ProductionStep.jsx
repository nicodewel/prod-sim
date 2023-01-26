import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProductionStep = ({ order, addToMap, mapEntry, setMapEntry }) => {

    const [step, setStep] = useState();
    const [selectedComponent, setSelectedComponent] = useState();
    const [stationEmp, setStationEmp] = useState()
    const robotList = useSelector(state => state.ressources.robots).filter(comp => !comp.onDuty)
    const employeeList = useSelector(state => state.ressources.employees).filter(comp => !comp.onDuty)
    const stationList = useSelector(state => state.ressources.stations).filter(comp => !comp.onDuty)
    

   

    //useEffect(() => {console.log(mapEntry)}, [selectedComponent])

    const handleSelection = (event, type, id) => {
        event.preventDefault();
       let comp;
        switch (type) {
            case "robot": 
            comp = robotList.find(e => e.id == id);
            break;
            case "station": comp = stationList.find(e => e.id == id); 
            break;
            case "employee": 
            comp = {...mapEntry.comp, employees : [...mapEntry.comp.employees, employeeList.find(e => e.id == id)]}; 
            break;
        }
        console.log({order:order , comp:comp})
        setMapEntry(mapEntry => {
            mapEntry.order = order 
            mapEntry.comp=comp
            return mapEntry
        })
        
        addToMap(mapEntry)
    }


    const checkTypeSelection = (t) => {
        switch (t) {
            case "Roboter":
                return (
                    <div className="col-sm-4">
                        <select className="form-select" aria-label="Default select example"  onChange={(e) => handleSelection(e, "robot",e.target.value)}>
                            <option defaultValue>Roboter wählen</option>
                            {robotList?.map((robot,i) => <option key={i} value={robot.id}>{robot.name}</option>)}
                        </select>
                    </div>
                );
            case "Station":
                return (
                    <div className="col-sm-4 d-flex">
                        <select className="form-select"  aria-label="Default select example" onChange={(e) => handleSelection(e, "station",e.target.value)}>
                            <option defaultValue>Station auswählen</option>
                            {stationList?.map((station,i) => <option key={i} value={station.id}>{station.name}</option>)}
                        </select>
                        
                        <select className="form-select"   aria-label="multiple select example" onChange={(e) => setStationEmp(e.target.value)}>
                            <option defaultValue>Mitarbeiter zuordnen</option>
                            {employeeList?.map((emp,i) => <option key={i} value={emp.id}>{emp.name}</option>)}
                            
                        </select>
                        <div className="col-sm-3"><button onClick={(e) => handleSelection(e, "employee",stationEmp)}>add</button></div>
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