import React, {useContext, useState, useRef, useEffect} from "react";
import AppContext from '../././../../components/AppContext';
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {api_get_cities, api_get_me, api_get_regions, api_step_2, api_update_my_profile} from "../../../services/data_provider";
import {
    get_age_array,
    get_birthday_days_array,
    get_birthday_months_array,
    get_birthday_years_array, get_height_array
} from "../../../helpers/DataCommon";
import FormInput from "../../../components/UI/FormInput";
import Select from "../../../components/UI/Select";

const CommonMyProfile = (props) => {
    const { t } = useTranslation();
    const globalContext = useContext(AppContext);
    const navigate = useNavigate();
    const [formSaveSuccess, setFormSaveSuccess] = useState(false);

    const [currentStep, setCurrentStep] = useState('');

    const [ageArray, setAgeArray] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [days, setDays] = useState([]);
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [badAgeErrorMessage, setBadErrorMessage] = useState(t('PLEASE_SELECT_MIN_AGE'));
    const [apiErrorMessages, setApiErrorMessages] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const form = [];

    const [day, setDay] = useState(undefined);
    const nameRef = useRef();
    const [errorName, setErrorName] = useState(false);

    const yearRef = useRef(null);
    const [errorYear, setErrorYear] = useState(false);
    form.push({el_ref: yearRef, el_error: setErrorYear, is_birthday: true, birthday_type: 'year'});

    const dayRef = useRef(null);

    const monthRef = useRef(null);
    const [errorMonth, setErrorMonth] = useState(false);
    form.push({el_ref: monthRef, el_error: setErrorMonth, is_birthday: true, birthday_type: 'month'});

    const [errorDay, setErrorDay] = useState(false);

    const myGenderRef = useRef();
    const [errorMyGender, setErrorMyGender] = useState(false);
    form.push({el_ref: myGenderRef, el_error: setErrorMyGender, name: 'gender'});

    const searchGenderRef = useRef(null);
    const [errorSearchGender, setErrorSearchGender] = useState(false);
    form.push({el_ref: searchGenderRef, el_error: setErrorSearchGender, name: 'search_gender'});

    const distanceRef = useRef(null);
    const [errorDistance, setErrorDistance] = useState(false);
    form.push({el_ref: distanceRef, el_error: setErrorDistance, name: 'search_distance'});

    const minAgeRef = useRef(null);
    const [errorMinAge, setErrorMinAge] = useState(false);
    form.push({el_ref: minAgeRef, el_error: setErrorMinAge, name: 'search_min_age'});

    const maxAgeRef = useRef(null);
    const [errorMaxAge, setErrorMaxAge] = useState(false);
    form.push({el_ref: maxAgeRef, el_error: setErrorMaxAge, name: 'search_max_age'});

    const regionRef = useRef(null);
    const [errorRegion, setErrorRegion] = useState(false);
    form.push({el_ref: regionRef, el_error: setErrorRegion, name: 'region'});

    const [errorCity, setErrorCity] = useState(false);
    const [myCity, setMyCity] = useState('');

    const myHeightRef = useRef(null);
    const [errorMyHeight, setErrorMyHeight] = useState(false);
    form.push({el_ref: myHeightRef, el_error: setErrorMyHeight, name: 'height'});

    const myBodyTypeRef = useRef(null);
    const [errorMyBody, setErrorMyBody] = useState(false);
    form.push({el_ref: myBodyTypeRef, el_error: setErrorMyBody, name: 'body_type'});

    const myDescriptionRef = useRef(null);

    const myGenderOptions = [{value: 'm', label: t('MALE')},{value: 'f', label: t('FEMALE')}];
    const searchGenderOptions = [{value: 'm', label: t('MALES')},{value: 'f', label: t('FEMALES')},{value: 'a', label: t('ALL')}];
    const distanceOptions = [{value: 'close', label: t('CLOSE_TO_ME')},{value: 'all', label: t('ALL_COUNTRY')}];

    const myBodyTypeOptions = [
        {value: 'xs', label: t('BODY_TYPE_XS')}
        ,{value: 's', label: t('BODY_TYPE_S')}
        ,{value: 'm', label: t('BODY_TYPE_M')}
        ,{value: 'l', label: t('BODY_TYPE_L')}
        ,{value: 'xl', label: t('BODY_TYPE_XL')}
    ];
    const myHeightOptions = get_height_array();

    const performPost = async (body) => {
        body.city = myCity;
        try{
            if(currentStep === 'done'){
                body.name = nameRef.current.value;
                const result = await api_update_my_profile(body);
                setSubmitting(false);
                if(result.status !== 200){
                    const errors = result?.data?.errors;
                    setApiErrorMessages(errors);
                    return;
                }
                setFormSaveSuccess(true);
                globalContext.loggedInUserDetails.name = nameRef.current.value;
                setTimeout(function(){
                    setFormSaveSuccess(false);
                }, 3000);
            }
            else{
                const result = await api_step_2(body);
                setSubmitting(false);
                if(result.status !== 200){
                    const errors = result?.data?.errors;
                    setApiErrorMessages(errors);
                    return;
                }
                navigate(t('URL_STEP3'));
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const saveChanges = () => {
        console.log("saveChanges");
        setApiErrorMessages([]);
        let found_invalid_fields = false;
        const birthday = {year: undefined, month: undefined, day: undefined};
        const form_post_fields = {};
        form.forEach(el => {
            if(el.el_ref?.current?.value){
                el.el_error(false);
                if(el.is_birthday){
                    switch(el.birthday_type){
                        case 'year': birthday.year = el.el_ref.current.value; break;
                        case 'month': birthday.month = el.el_ref.current.value; break;
                        case 'day': birthday.day = day; console.log("day",day); break;
                        default: console.log("should not be here");
                    }
                }
                else{
                    form_post_fields[el.name] = el.el_ref.current.value;
                }
            }
            else{
                el.el_error(true);
                found_invalid_fields = true;
            }
        });

        if(found_invalid_fields){
            return;
        }
        if(maxAgeRef.current.value < minAgeRef.current.value){
            setErrorMinAge(true);
            setBadErrorMessage(t('MIN_AGE_CANNOT_BE_BIGGER_TAHN_MAX_AGE'));
            return;
        }
        if(!myCity){
            setErrorCity(true);
            return;
        }
        setErrorCity(false);
        if(!day){
            setErrorDay(true);
            return;
        }
        setErrorDay(false);
        if(currentStep === 'done' && !nameRef.current.value){
            setErrorName(true);
            return;
        }
        setSubmitting(true);
        const birthday_date = `${birthday.year}-${birthday.month}-${day}`;
        form_post_fields.birthday = birthday_date;
        if(myDescriptionRef?.current?.value){
            form_post_fields.description = myDescriptionRef.current.value;
        }
        console.log("setTimeout");
        setTimeout(performPost, 1000, form_post_fields);
    }

    const citySelected = (value) => {
        setMyCity(value);
    }

    const regionChanged = async (id) => {
        try{
            const city_result = await api_get_cities(id);
            if(city_result?.status === 200){
                city_result.data.cities.forEach(el => {
                    el.value = el._id;
                    el.label = el.name;
                });
                setCities(city_result.data.cities);
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }

    const fetchRegions = async () => {
        try{
            const region_result = await api_get_regions();
            if(region_result?.status === 200){
                region_result.data.regions.forEach(el => {
                    el.value = el._id;
                    el.label = el.name;
                });
                setRegions(region_result.data.regions);
            }
        }
        catch(exception){
            console.log("exception",exception);
        }
    }
    const monthChanged = async (month) => {
        setDays(get_birthday_days_array(month, yearRef));
    }
    useEffect(() => {
        const setDefaultValues = async () => {
            if(!ageArray.length){
                setYears(get_birthday_years_array());
                setAgeArray(get_age_array(t('YEARS_OLD')));
                const months = [
                    t('JANUARY'),t('FEBRUARY'),t('MARCH')
                    ,t('APRIL'),t('MAY'),t('JUNE')
                    ,t('JULY'),t('AUGUST'),t('SEPTEMBER')
                    ,t('OCTOBER'),t('NOVEMBER'),t('DECEMBER')
                ];
                setMonths(get_birthday_months_array(months));
                try{
                    const response = await api_get_me();
                    if(response.status === 200){
                        globalContext.loggedInUserDetails = response.data.user;
                        const user = response.data.user;
                        setCurrentStep(user.current_step);
                        //This is not step 3. We need to set default values
                        if(user.current_step === 'done'){
                            await fetchRegions();
                            nameRef.current.value = user.name;
                            myGenderRef.current.value = user.gender;
                            searchGenderRef.current.value = user.search_gender;
                            minAgeRef.current.value = user.search_min_age;
                            maxAgeRef.current.value = user.search_max_age;
                            await regionChanged(user.region);
                            regionRef.current.value = user.region;
                            const date = new Date(user.birthday);
                            const year = date.getFullYear();
                            const full_month = date.getMonth();
                            const month = (full_month+1) < 10 ? `0${full_month+1}` : full_month+1;
                            const tmp_day = date.getDate();
                            const day = tmp_day < 10 ? `0${tmp_day}` : tmp_day;
                            console.log('day:',day);
                            await monthChanged(month);
                            yearRef.current.value = year;
                            monthRef.current.value = month;
                            dayRef.current.value = day < 10 ? `0${day}` : day;
                            console.log('dayRef.current.value:',dayRef.current.value)
                            setDay(day);
                            setMyCity(user.city);
                            distanceRef.current.value = user.search_distance;
                            myHeightRef.current.value = user.height;
                            myBodyTypeRef.current.value = user.body_type;
                            myDescriptionRef.current.value = user.description;
                        }
                        else{
                            await fetchRegions();
                        }
                    }
                }
                catch(exception){
                    console.log('exception:',exception);
                }
            }
        }
        setDefaultValues().catch(console.error);
    });

    return(
        <div className="ui-block">
            <div className="ui-block-title">
                <h6 className="title">
                    {props.title}
                </h6>
            </div>
            <div className="ui-block-content">
                <div className="row">
                    {
                        currentStep === 'done' &&
                        <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                            <FormInput label="INDEX_FORM_NAME" ref_element={nameRef} input_type="text" has_errored={errorName} error_message={t('NAME_IS_REQUIRED')}/>
                        </div>
                    }
                    <Select
                        label={t('MY_GENDER')}
                        selected_option={t('I_AM')}
                        options={myGenderOptions}
                        my_ref={myGenderRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_YOUR_GENDER')}
                        has_errored={errorMyGender}
                    />
                    <Select
                        label={t('SEARCHED_GENDER')}
                        selected_option={t('I_AM_SEARCHING')}
                        options={searchGenderOptions}
                        my_ref={searchGenderRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_SEARCH_GENDER')}
                        has_errored={errorSearchGender}
                    />
                    <Select
                        label={t('MIN_AGE')}
                        selected_option={t('MIN_AGE_PARTNER')}
                        options={ageArray}
                        my_ref={minAgeRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={badAgeErrorMessage}
                        has_errored={errorMinAge}
                    />
                    <Select
                        label={t('MAX_AGE')}
                        selected_option={t('MAX_AGE_PARTNER')}
                        options={ageArray}
                        my_ref={maxAgeRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_MAX_AGE')}
                        has_errored={errorMaxAge}
                    />
                    <Select
                        label={t('MY_REGION')}
                        selected_option={t('I_LIVE_IN_REGION')}
                        options={regions}
                        my_ref={regionRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        on_change={regionChanged}
                        error_message={t('PLEASE_SELECT_REGION')}
                        has_errored={errorRegion}
                    />
                    <div className={`col col-lg-6 col-md-6 col-sm-12 col-12`}>
                        <div className="form-group label-floating is-select">
                            <label className="control-label">
                                {t('MY_CITY')}
                            </label>
                            <select value={myCity} className="form-select" onChange={e => citySelected(e.target.value)}>
                                <option value="">{t('IN_THE_CITY')}</option>
                                {
                                    cities.length && cities.map((opt, index) =>
                                        <option key={index} value={opt.value}>{opt.label}</option>
                                    )
                                }
                            </select>
                            <div className={`invalid-feedback ${errorCity ? 'd-block' : 'd-none'}`}>
                                {t('PLEASE_SELECT_CITY')}
                            </div>
                        </div>
                    </div>

                    <Select
                        label={t('DISTANCE_FOR_YOUR_PARTNER')}
                        selected_option={t('SELECT_DISTANCE')}
                        options={distanceOptions}
                        my_ref={distanceRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_DISTANCE')}
                        has_errored={errorDistance}
                    />
                    <Select
                        label={t('MY_BIRTHDAY_YEAR')}
                        selected_option={t('SELECT_YEAR')}
                        options={years}
                        my_ref={yearRef}
                        cols={{lg: '2',md: '2',sm: '12'}}
                        error_message={t('PLEASE_SELECT_YEAR')}
                        has_errored={errorYear}
                    />
                    <Select
                        label={t('MY_BIRTHDAY_MONTH')}
                        selected_option={t('SELECT_MONTH')}
                        options={months}
                        my_ref={monthRef}
                        cols={{lg: '2',md: '2',sm: '12'}}
                        on_change={monthChanged}
                        error_message={t('PLEASE_SELECT_MONTH')}
                        has_errored={errorMonth}
                    />
                    <div className={`col col-lg-2 col-md-2 col-sm-12 col-12`}>
                        <div className="form-group label-floating is-select">
                            <label className="control-label">
                                {t('MY_BIRTHDAY_DAY')}
                            </label>
                            <select value={day} ref={dayRef} className="form-select" onChange={e => setDay(e.target.value)}>
                                <option value="">{t('SELECT_DAY')}</option>
                                {
                                    days.map((opt, index) =>
                                        <option key={index} value={opt.value}>{opt.label}</option>
                                    )
                                }
                            </select>
                            <div className={`invalid-feedback ${errorDay ? 'd-block' : 'd-none'}`}>
                                {t('PLEASE_SELECT_DAY')}
                            </div>
                        </div>
                    </div>
                    <Select
                        label={t('MY_HEIGHT')}
                        selected_option={t('I_AM')}
                        options={myHeightOptions}
                        my_ref={myHeightRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_HEIGHT')}
                        has_errored={errorMyHeight}
                    />
                    <Select
                        label={t('MY_BODY_TYPE')}
                        selected_option={t('I_AM')}
                        options={myBodyTypeOptions}
                        my_ref={myBodyTypeRef}
                        cols={{lg: '6',md: '6',sm: '12'}}
                        error_message={t('PLEASE_SELECT_BODY_TYPE')}
                        has_errored={errorMyBody}
                    />
                    <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                            <label className="control-label">{t('DESCRIBE_YOURSELF')}</label>
                            <textarea className="form-control" ref={myDescriptionRef}></textarea>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-6 col-sm-12 col-12 offset-md-3 offset-lg-3">
                        {
                            apiErrorMessages.length > 0 &&
                            <div className="alert alert-danger text-center">
                                {
                                    apiErrorMessages.map((error, index) =>
                                        <div key={index}>{t(error)}</div>
                                    )
                                }
                            </div>
                        }
                        {
                            formSaveSuccess &&
                            <div className="alert alert-success text-center">
                                {t('YOUR_PROFILE_HAS_BEEN_UPDATED')}
                            </div>
                        }

                        <button disabled={submitting} onClick={saveChanges} className="btn btn-primary btn-lg full-width">
                            {t('SAVE_BUTTON')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CommonMyProfile;