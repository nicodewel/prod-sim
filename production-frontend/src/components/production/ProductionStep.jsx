import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";



const ProductionStep = ({ order, addToMap, mapEntry, setMapEntry, robots, stations, employees }) => {

    const [step, setStep] = useState();
    const [stationEmp, setStationEmp] = useState()
    
    const ref = useRef({robots, stations, employees})

    useEffect(() => {
        console.log("REF: ", ref.current)
    });



    const handleSelection = (event, type, id) => {
        event.preventDefault();
        let comp;
        switch (type) {
            case "robot":
                comp = robots.find(e => e.id == id);
                break;
            case "station": comp = stations.find(e => e.id == id);
                break;
            case "employee":
                comp = { ...mapEntry.comp, employees: [...mapEntry.comp.employees, employees.find(e => e.id == id)] };
                break;
        }
        console.log({ order: order, comp: comp })
        setMapEntry(mapEntry => {
            mapEntry.order = order
            mapEntry.comp = comp
            return mapEntry
        })

        addToMap(mapEntry)
    }

    const generateClassName = () => {
        return `form-select prodStep${order}`;
    }


    const checkTypeSelection = (t) => {
        switch (t) {
            case "Roboter":
                return (
                    <div className="col-sm-4">
                        <select className={generateClassName()} aria-label="Default select example" onChange={(e) => handleSelection(e, "robot", e.target.value)}>
                            <option defaultValue>Roboter wählen</option>
                            {ref.current.robots?.map((robot, i) => {

                                return (<option key={i} value={robot.id}>{robot.name}</option>)
                            }

                            )}

                        </select>
                    </div>
                );
            case "Station":
                return (
                    <div className="col-sm-4 d-flex">
                        <select className={generateClassName()} aria-label="Default select example" onChange={(e) => handleSelection(e, "station", e.target.value)} >
                            <option defaultValue>Station auswählen</option>
                            {ref.current.stations?.map((station, i) => <option key={i} value={station.id}>{station.name}</option>)}
                        </select>

                        
                        {/* <select className={generateClassName()} aria-label="multiple select example" onChange={(e) => setStationEmp(e.target.value)}>
                            <option defaultValue>Mitarbeiter zuordnen</option>
                            {ref.current.employees?.map((emp, i) => <option key={i} value={emp.id}>{emp.name}</option>)}

                        </select>
                        <div className="col-sm-3"><button onClick={(e) => handleSelection(e, "employee", stationEmp)}>Mitarbeiter zuweisen</button></div> */}
                    </div>
                );
            default:
                return (<div></div>)
        }
    }

    return (

        <div className="row mb-3" >
            <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Schritt {order}</label>
            <div className="col-sm-4">
                <select className={generateClassName()} aria-label="Default select example" onChange={(e) => setStep(e.target.value)} >
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