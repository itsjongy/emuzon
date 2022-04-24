import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderAddress, editOrderAddress } from "../../../store/order";
import "./EditAddress.css";

const EditAddress = ({ setAddressChange, currentFirst, currentLast, userId }) => {
    const dispatch = useDispatch();
    const order = useSelector(state => Object.values(state.order));
    const newOrders = order[order.length - 1];
    const [firstName, setFirstName] = useState(newOrders ? newOrders.order_first : currentFirst)
    const [lastName, setLastName] = useState(newOrders ? newOrders.order_last : currentLast);
    const [address, setAddress] = useState(newOrders?.address);
    const [city, setCity] = useState(newOrders?.city);
    const [state, setState] = useState(newOrders?.state);
    const [zipCode, setZipCode] = useState(newOrders?.zip_code);
    let [errors, setErrors] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);

    const validation = () => {
        const validations = [];

        if (firstName.length === 0) validations.push("Enter a first name.");
        if (lastName.length === 0) validations.push("Enter a last name.");
        if (!address) validations.push("Enter an address.");
        if (city.length === 0) validations.push("Enter a city.");
        if (!state) validations.push("Select a state.")
        // if (zipCode.length < 5 && /\d{5}/i.test(zipCode)) validations.push("Enter a valid zip code.")

        return validations;
    }

    const states = {
        AL: "Alabama",
        AK: "Alaska",
        AS: "American Samoa",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DE: "Delaware",
        DC: "District Of Columbia",
        FM: "Federated States Of Micronesia",
        FL: "Florida",
        GA: "Georgia",
        GU: "Guam",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MH: "Marshall Islands",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        MP: "Northern Mariana Islands",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PW: "Palau",
        PA: "Pennsylvania",
        PR: "Puerto Rico",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VI: "Virgin Islands",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        errors = validation();
        if (errors.length > 0) return setValidationErrors(errors);
        else {
            const payload = await dispatch(
                addOrderAddress(
                    userId,
                    address,
                    city,
                    state,
                    zipCode,
                    firstName,
                    lastName
                )
            );
            if (payload) {
                setErrors(payload);
            };
            setAddressChange(false);
        };
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        errors = validation();
        if (errors.length > 0) return setValidationErrors(errors);
        else {
            const payload = await dispatch(
                editOrderAddress(
                    userId,
                    address,
                    city,
                    state,
                    zipCode,
                    firstName,
                    lastName
                )
            );
            if (payload) {
                setErrors(payload);
            };
            setAddressChange(false);
        };
    };

    return (
        <div>
            <div>
                <h4>
                    {newOrders ? `Edit shipping address` : `Enter a new shipping address`}
                </h4>
            </div>
            {validationErrors.length > 0 && (
                <div>
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <h2>
                    {newOrders ? `Edit address` : `Add a new address`}
                </h2>
                <div>
                    <p>Country/Region</p>
                    <select id="country">
                        <option value="United States">United States</option>
                    </select>
                </div>
                <div>
                    <div>
                        <p>First name</p>
                        <input
                            type="text"
                            name="order_first"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <p>Last name</p>
                        <input
                            type="text"
                            name="order_last"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div>
                    <p>Address</p>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}>
                    </input>
                </div>
                <div>
                    <p>City</p>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <p>State</p>
                    <select id="state" onChange={(e) => setState(e.target.value)} defaultValue={state}>
                        {Object.keys(states).map((each, idx) => (
                            <option value={each} key={idx}>
                                {each}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>ZIP Code</p>
                    <input
                        type="text"
                        name="zip_code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        maxLength="5">
                    </input>
                </div>
                {(() => {
                    if (newOrders)
                        if (Object.values(newOrders).includes(null))
                            return (
                                <button onClick={handleEdit}>
                                    Use this address
                                </button>
                            );
                        else
                            return (
                                <button onClick={handleSubmit}>
                                    Use this address
                                </button>
                            );
                    else
                        return (
                            <button onClick={handleSubmit}>
                                Use this address
                            </button>
                        );
                })()}
            </div>
        </div >
    );
};

export default EditAddress;
