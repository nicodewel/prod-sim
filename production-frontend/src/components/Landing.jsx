import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllRobots } from "./production/robotSlice";



const Landing = () => {


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllRobots());
    }, [])

    

    return (
        <div>
            <h1>ProduktionsstraßenplanungsApp</h1>

            <h2>Übersicht</h2>
            <table className="table caption-top">
                <caption>Aktuelle Produktionsstraßen</caption>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Simulationsstatus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Golflinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Tiguanlinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Touranlinie</td>
                        <td>lauffähig/ unvollständig</td>
                        <td>läuft/läuft nicht </td>
                    </tr>
                </tbody>
            </table>

            <NavLink to="/createproductionline"><button>Neue Produktionsstraße anlegen</button></NavLink>
            <NavLink to="/createstation"><button>Neue Ressource anlegen</button></NavLink>


        </div>
    )

}

export default Landing;