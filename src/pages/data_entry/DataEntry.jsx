import React, { useState } from "react";
import Contact from "../../components/contact/Contact";
import Footer from "../../components/footer/Footer";
import "../data_entry/DataEntry.css";
import { useCreateDataEntryMutation } from "../../services/dataEntryApi";

const DataEntry = () => {
  const [formData, setFormData] = useState({
    dateOfRecord: "",
    wakeUpTime: { hour: 0, minute: 0 },
    wakingUp: 0,
    firstGoOut: 0,
    firstScreenOn: 0,
    breakfast: 0,
    schooling: "",
    classActivity: 0,
    outdoorActivity: 0,
    therapyAtSchool: "",
    therapyType: "",
    lunch: 0,
    eveningSnacks: 0,
    dinner: 0,
    goingToSleep: 0,
    goToBedAt: { hour: 0, minute: 0 },
    sleepAt: { hour: 0, minute: 0 },
    gettingSleepTime: 0,
    outgoingTendency: 0,
    outgoingCount: 0,
    screenTime: 0,
    junkFood: 0,
    makingNoise: 0,
    walking: 0,
    showingAnger: 0,
    glassCrashTendency: 0,
    pushingTendency: 0,
    itemThrowTendency: 0,
    foodWaterThrowTendency: 0,
    hitWithHand: 0,
    hitWithHead: 0,
    cooperateAtSchool: 0,
    cooperateAtHome: 0,
    cuttingNails: 0,
    hairDressing: 0,
    bedwetting: 0,
    regularMedication: "",
    otherSickness: "",
    nameOfSickness: "",
    medOtherSickness: "",
    listOfMedicine: "",
    masturbation: 0,
    toilet: 0,
    overnightSleeping: 0,
    specialActivity: "",
  });

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [success, setSuccess] = useState({
    status: false,
    msg: "",
  });

  const [dataEntry, { isLoading }] = useCreateDataEntryMutation();

  const handleChange = (e) => {
    const { name, value, type, dataset } = e.target;

    // Check for valid numbers in the range of 0 to 10
    if (
      type === "number" &&
      name !== "wakeUpTime" &&
      name !== "goToBedAt" &&
      name !== "sleepAt" &&
      (value < 0 || value > 10)
    )
      return;

    // Handle changes for time objects (hour and minute)
    if (name === "wakeUpTime" || name === "goToBedAt" || name === "sleepAt") {
      const newValues = { ...formData[name] };
      newValues[dataset.index] = value;
      setFormData({ ...formData, [name]: newValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to submit data.");
      return;
    }

    try {
      const res = await dataEntry({ formData, token }).unwrap();
      console.log("Data Entry Response:", res);
      if (res.status === "success") {
        setSuccess({
          status: true,
          msg: "Data Entry Successful",
        });
        setError({ status: false, msg: "", type: "" });

        // Reset the form after success
        setFormData({
          dateOfRecord: "",
          wakeUpAt: [0, 0],
          wakingUp: 0,
          firstGoOut: 0,
          firstScreenOn: 0,
          breakfast: 0,
          schooling: "",
          classActivity: 0,
          outdoorActivity: 0,
          therapyAtSchool: "",
          therapyType: "",
          lunch: 0,
          eveningSnacks: 0,
          dinner: 0,
          goingToSleep: 0,
          goToBedAt: [0, 0],
          sleepAt: [0, 0],
          gettingSleepTime: 0,
          outgoingTendency: 0,
          outgoingCount: 0,
          medOtherSickness: "",
          nameOfSickness: "",
          masturbation: 0,
          toilet: 0,
          listOfMedicine: "",
          overnightSleeping: 0,
          specialActivity: "",
        });
      } else {
        setError({
          status: true,
          msg: "Unexpected error occurred during data entry",
          type: "error",
        });
        setSuccess({ status: false, msg: "" });
      }
    } catch (err) {
      console.error("Data Entry API Error:", err);
      setError({
        status: true,
        msg: "Data Entry Failed",
        type: "error",
      });
      setSuccess({ status: false, msg: "" });
    }
  };

  const closeModal = () => {
    setError({ status: false, msg: "", type: "" });
    setSuccess({ status: false, msg: "" });
  };

  return (
    <div>
      <div className="data-entry-container">
        <form onSubmit={handleSubmit}>
          <div className="data-heading">
            <p className="data-title">STUDENT DATA ENTRY FORM</p>
            <p className="warning-text">
              "<span className="star">*</span>" indicates required fields
            </p>
          </div>

          <div className="data-entry-box">
            {/* Date of Record */}
            <div className="date">
              <p className="entry-title">
                Date <span className="star">*</span>
              </p>
              <input
                type="date"
                name="dateOfRecord"
                value={formData.dateOfRecord}
                onChange={handleChange}
                required
              />
              <p className="tale-title">Date of the record</p>
            </div>

            {/* Wake Up Time */}
            <div className="wake-up-time single-entry-field">
              <p className="entry-title">Wake_up_at</p>
              <input
                type="number"
                name="wakeUpTime"
                data-index="hour"
                value={formData.wakeUpTime ? formData.wakeUpTime.hour : 0}
                onChange={handleChange}
              />
              <input
                type="number"
                name="wakeUpTime"
                data-index="minute"
                value={formData.wakeUpTime ? formData.wakeUpTime.minute : 0}
                onChange={handleChange}
              />
              <p className="tale-title">Exact time when wakeup</p>
            </div>

            {/* Waking Up Quality */}
            <div className="wake-up-point">
              <p className="entry-title">
                Waking_up <span className="star">*</span>
              </p>
              <input
                type="number"
                name="wakingUp"
                value={formData.wakingUp}
                onChange={handleChange}
                placeholder="0-10"
                required
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How he wakes up in the morning, is it normal or not. Is there
                any aggressiveness or not? Here 0 is the worst and 10 is the
                best
              </p>
            </div>

            {/* First Go Out */}
            <div className="go_out single-entry-field">
              <p className="entry-title">
                1st_go_out <span className="star">*</span>
              </p>
              <input
                type="number"
                name="firstGoOut"
                value={formData.firstGoOut}
                onChange={handleChange}
                placeholder="0-10"
                required
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                After waking up from bed, how he starts his first hour. If he
                takes more time to go out, that's a good sign of his condition.
              </p>
            </div>

            {/* First Screen On */}
            <div className="screen_on single-entry-field">
              <p className="entry-title">
                1st_screen_on <span className="star">*</span>
              </p>
              <input
                type="number"
                name="firstScreenOn"
                value={formData.firstScreenOn}
                onChange={handleChange}
                placeholder="0-10"
                required
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                When he first starts the TV or mobile. If he takes more time to
                use those, it indicates he is feeling good.
              </p>
            </div>

            {/* Breakfast */}
            <div className="screen_on single-entry-field">
              <p className="entry-title">
                Breakfast <span className="star">*</span>
              </p>
              <input
                type="number"
                name="breakfast"
                value={formData.breakfast}
                onChange={handleChange}
                placeholder="0-10"
                required
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he take breakfast normally or not? Does he have a normal
                appetite? 0 means no appetite and 10 is a good and normal
                appetite.
              </p>
            </div>
          </div>

          {/* Schooling */}
          <div className="data-entry-box">
            <div className="radio-entry">
              <p className="entry-title">
                Schooling <span className="star">*</span>
              </p>
              <input
                required
                type="radio"
                name="schooling"
                value="Yes"
                checked={formData.schooling === "Yes"}
                onChange={handleChange}
              />
              <label htmlFor="Yes">Yes</label> <br />
              <input
                type="radio"
                name="schooling"
                value="No"
                checked={formData.schooling === "No"}
                onChange={handleChange}
              />
              <label htmlFor="No">No</label>
            </div>

            {/* Class Activity */}
            <div className="Class_activity single-entry-field">
              <p className="entry-title">
                Class_activity <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="classActivity"
                value={formData.classActivity}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Overall class activity. Does he follow all instructions from his
                teacher or not? 0 means an off day, 1 is the worst, and 10 is
                the best.
              </p>
            </div>

            {/* Outdoor Activity */}
            <div className="Outdoor_activity single-entry-field">
              <p className="entry-title">
                Outdoor_activity <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="outdoorActivity"
                value={formData.outdoorActivity}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Outdoor activity. Does he follow instructions from his teacher?
                0 means an off day, 1 is the worst, and 10 is the best.
              </p>
            </div>
          </div>
          <div className="data-entry-box">
            {/* Therapy at School */}
            <div className="radio-entry">
              <p className="entry-title">
                Therapy_at_school <span className="star">*</span>
              </p>
              <input
                required
                type="radio"
                name="therapyAtSchool"
                value="Yes"
                checked={formData.therapyAtSchool === "Yes"}
                onChange={handleChange}
              />
              <label htmlFor="Yes">Yes</label> <br />
              <input
                type="radio"
                name="therapyAtSchool"
                value="No"
                checked={formData.therapyAtSchool === "No"}
                onChange={handleChange}
              />
              <label htmlFor="No">No</label> <br />
            </div>

            {/* Therapy Type */}
            <div className="Therapy_type">
              <p className="entry-title">
                Therapy_type <span className="star">*</span>
              </p>
              <input
                required
                type="radio"
                name="therapyType"
                value="OT"
                checked={formData.therapyType === "OT"}
                onChange={handleChange}
              />
              <label htmlFor="OT">OT</label> <br />
              <input
                type="radio"
                name="therapyType"
                value="PT"
                checked={formData.therapyType === "PT"}
                onChange={handleChange}
              />
              <label htmlFor="PT">PT</label> <br />
              <input
                type="radio"
                name="therapyType"
                value="SLT"
                checked={formData.therapyType === "SLT"}
                onChange={handleChange}
              />
              <label htmlFor="SLT">SLT</label> <br />
              <p className="tale-title">
                What kind of therapy he/she gets today. Mark as much as he/she
                gets it.
              </p>
            </div>

            {/* Lunch */}
            <div className="Lunch single-entry-field">
              <p className="entry-title">
                Lunch <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="lunch"
                value={formData.lunch}
                onChange={handleChange}
                placeholder="0-10"
              />

              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he take the Lunch properly? Appetite and asking for
                favorite food. 0 is the worst and 10 is the best
              </p>
            </div>
          </div>
          <div className="data-entry-box">
            <div className="Evening_snacks single-entry-field">
              <p className="entry-title">
                Evening_snacks <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="eveningSnacks"
                value={formData.eveningSnacks}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">
                Does he take the snacks properly? Appetite and asking for food.
                0 is the worst and 10 is the best
              </p>
            </div>

            <div className="Dinner single-entry-field">
              <p className="entry-title">
                Dinner <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="dinner"
                value={formData.dinner}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">
                Does he take the dinner properly? Appetite and asking for
                favorite food? 0 is the worst and 10 is the best
              </p>
            </div>
            <div className="Going_to_sleep single-entry-field">
              <p className="entry-title">
                Going_to_sleep <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="goingToSleep"
                value={formData.goingToSleep}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">
                Does he fall asleep on time? 0 is the worst and 10 is the best
              </p>
            </div>
          </div>
          <div className="data-entry-box">
            {/* Go to Bed At */}
            <div className="time-input time-entry-field">
              <p className="entry-title">Go to Bed At</p>
              <input
                type="number"
                name="goToBedAt"
                data-index="hour"
                value={formData.goToBedAt ? formData.goToBedAt.hour : 0}
                onChange={handleChange}
              />
              <input
                type="number"
                name="goToBedAt"
                data-index="minute"
                value={formData.goToBedAt ? formData.goToBedAt.minute : 0}
                onChange={handleChange}
              />
              <p className="tale-title">Exact time of going to bed (HH:MM)</p>
            </div>

            {/* Sleep At */}
            <div className="time-input time-entry-field">
              <p className="entry-title">Sleep At</p>
              <input
                type="number"
                name="sleepAt"
                data-index="hour"
                value={formData.sleepAt ? formData.sleepAt.hour : 0}
                onChange={handleChange}
              />
              <input
                type="number"
                name="sleepAt"
                data-index="minute"
                value={formData.sleepAt ? formData.sleepAt.minute : 0}
                onChange={handleChange}
              />
              <p className="tale-title">Exact time of sleeping (HH:MM)</p>
            </div>

            {/* Getting Sleep Time */}
            <div className="Getting_sleep_time single-entry-field">
              <p className="entry-title">
                Getting_sleep_time <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="gettingSleepTime"
                value={formData.gettingSleepTime}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How much time he took to sleep after going to bed. 0 is the best
                timing that is he gone sleep just after going to bed and higher
                number is he took more time to sleep, which is not good
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Outgoing Tendency */}
            <div className="Outgoing_tendency single-entry-field">
              <p className="entry-title">
                Outgoing_tendency <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="outgoingTendency"
                value={formData.outgoingTendency}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How he wants to go outside? Does it very aggressive or not. Does
                he listen when asking to wait? Here 0 is the best and 10 is the
                worst
              </p>
            </div>

            {/* Outgoing Count */}
            <div className="Outgoing_count single-entry-field">
              <p className="entry-title">
                Outgoing_count <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="outgoingCount"
                value={formData.outgoingCount}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Total number of outgoing, 0 is the best and higher number is bad
                as high as it is
              </p>
            </div>

            {/* Screen Time */}
            <div className="Screen_time single-entry-field">
              <p className="entry-title">
                Screen_time <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="screenTime"
                value={formData.screenTime}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Total number of hours he used the phone. Less number is good and
                higher number is bad
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Junk Food */}
            <div className="Junk_Food single-entry-field">
              <p className="entry-title">
                Junk_Food <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="junkFood"
                value={formData.junkFood}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How frequently he wants to take junk food like chips, biscuits
                etc. less number is good and higher number is worst
              </p>
            </div>

            {/* Making Noise */}
            <div className="Making_noise single-entry-field">
              <p className="entry-title">
                Making_noise <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="makingNoise"
                value={formData.makingNoise}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How frequently and how long he makes noises. Less is good and
                higher is bad
              </p>
            </div>

            {/* Walking */}
            <div className="Walking single-entry-field">
              <p className="entry-title">
                Walking <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="walking"
                value={formData.walking}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How frequently or how long he walks around the rooms. Less time
                is good and higher is bad
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Showing Anger */}
            <div className="Showing_anger single-entry-field">
              <p className="entry-title">
                Showing_anger <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="showingAnger"
                value={formData.showingAnger}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Tendency and number of showing anger through the day. Less
                number is good and higher is bad
              </p>
            </div>

            {/* Glass Crash Tendency */}
            <div className="Glass_crash_tendency single-entry-field">
              <p className="entry-title">
                Glass_crash_tendency <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="glassCrashTendency"
                value={formData.glassCrashTendency}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he show any tendency to crash any glassware? Usually
                glassware are kept away from him. But at the worst time he tries
                to find it out and want to crash it. Less number is good and
                higher is bad
              </p>
            </div>

            {/* Pushing Tendency */}
            <div className="Pushing_tendency single-entry-field">
              <p className="entry-title">
                Pushing_tendency <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="pushingTendency"
                value={formData.pushingTendency}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How he shows his pushing tendency, does he push any kids or
                family member? Less is good and higher is bad
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Item Throw Tendency */}
            <div className="item_throw_tendency single-entry-field">
              <p className="entry-title">
                item_throw_tendency <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="itemThrowTendency"
                value={formData.itemThrowTendency}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he throw any item away, or throw it out the window? Less is
                good and higher is bad
              </p>
            </div>

            {/* Food Water Throw Tendency */}
            <div className="Food_water_throw_tendency single-entry-field">
              <p className="entry-title">
                Food_water_throw_tendency <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="foodWaterThrowTendency"
                value={formData.foodWaterThrowTendency}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he throw his favorite food away? Less is good and higher is
                bad
              </p>
            </div>

            {/* Hit with Hand */}
            <div className="Hit_with_hand single-entry-field">
              <p className="entry-title">
                Hit_with_hand <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="hitWithHand"
                value={formData.hitWithHand}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he show anger and hit with his hand? Less is good and
                higher is bad
              </p>
            </div>
          </div>
          <div className="data-entry-box">
            {/* Hit with Head */}
            <div className="Hit_with_head single-entry-field">
              <p className="entry-title">
                Hit_with_head <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="hitWithHead"
                value={formData.hitWithHead}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he show anger and hit with his head or hit his head on the
                wall? Less is good and higher is bad.
              </p>
            </div>

            {/* Cooperate at School */}
            <div className="Cooperate_at_school single-entry-field">
              <p className="entry-title">
                Cooperate_at_school <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="cooperateAtSchool"
                value={formData.cooperateAtSchool}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How he cooperates with his daily life works at school. Less is
                bad and higher is good. 0 means off day.
              </p>
            </div>

            {/* Cooperate at Home */}
            <div className="Cooperate_at_home single-entry-field">
              <p className="entry-title">
                Cooperate_at_home <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="cooperateAtHome"
                value={formData.cooperateAtHome}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How he cooperates with his daily life works at home. Less is bad
                and higher is good.
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Cutting Nails */}
            <div className="Cutting_nails single-entry-field">
              <p className="entry-title">
                Cutting_nails <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="cuttingNails"
                value={formData.cuttingNails}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he cooperate in cutting nails or not? Less is bad and
                higher is good. Usually it occurs once a week. 0 means not
                occur.
              </p>
            </div>

            {/* Hair Dressing */}
            <div className="Hair_dressing single-entry-field">
              <p className="entry-title">
                Hair_dressing <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="hairDressing"
                value={formData.hairDressing}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Does he cooperate in dressing his hair? Less is bad and higher
                is good. Usually it occurs once a month. 0 means not occur.
              </p>
            </div>

            {/* Bedwetting */}
            <div className="Bedwetting single-entry-field">
              <p className="entry-title">
                Bedwetting <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="bedwetting"
                value={formData.bedwetting}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                Is there any bedwetting count today? When and how many times.
                Less is good and higher is bad.
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Regular Medication */}
            <div className="radio-entry">
              <p className="entry-title">Regular_Medication</p>
              <input
                type="radio"
                name="regularMedication"
                value="Yes"
                onChange={handleChange}
              />
              <label htmlFor="Yes">Yes</label> <br />
              <input
                type="radio"
                name="regularMedication"
                value="No"
                onChange={handleChange}
              />
              <label htmlFor="No">No</label> <br />
              <p className="tale-title">
                Does he take the regular medication on time? Is there any
                changes on it? Yes or no. Changes are recorded separately. Yes
                is good and No is not good. Need the details.
              </p>
            </div>

            {/* Other Sickness */}
            <div className="radio-entry">
              <p className="entry-title">Other_Sickness </p>
              <input
                type="radio"
                name="otherSickness"
                value="Yes"
                onChange={handleChange}
              />
              <label htmlFor="Yes">Yes</label> <br />
              <input
                type="radio"
                name="otherSickness"
                value="No"
                onChange={handleChange}
              />
              <label htmlFor="No">No</label> <br />
              <p className="tale-title">
                Is there any other sickness like fever, cold etc.? Less is good
                and higher is bad.
              </p>
            </div>

            {/* Name of Sickness */}
            <div className="name-of-sickness single-entry-field">
              <p className="entry-title">Name of Sickness</p>
              <input
                type="text"
                name="nameOfSickness"
                value={formData.nameOfSickness}
                onChange={handleChange}
              />
              <p className="tale-title">Name or description of the sickness.</p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Medication for Other Sickness */}
            <div className="radio-entry Med_other_sickness">
              <p className="entry-title">Med_other_sickness</p>
              <input
                type="radio"
                name="medOtherSickness"
                value="Yes"
                onChange={handleChange}
              />
              <label htmlFor="Yes">Yes</label> <br />
              <input
                type="radio"
                name="medOtherSickness"
                value="No"
                onChange={handleChange}
              />
              <label htmlFor="No">No</label> <br />
              <p className="tale-title">
                Does he need any medication for other sickness?
              </p>
            </div>

            {/* List of Medicine */}
            <div className="List_of_medicine single-entry-field">
              <p className="entry-title">List of Medicines</p>
              <textarea
                className="border"
                name="listOfMedicine"
                value={formData.listOfMedicine}
                onChange={handleChange}
                cols="25"
                rows="3"
              ></textarea>
              <p className="tale-title">
                List of all medicine required for the other sickness.
              </p>
            </div>

            {/* Masturbation */}
            <div className="Masturbation single-entry-field">
              <p className="entry-title">
                Masturbation <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="masturbation"
                value={formData.masturbation}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How many times he tries to masturbate and when? Less is good and
                higher is bad.
              </p>
            </div>
          </div>

          <div className="data-entry-box">
            {/* Toilet */}
            <div className="Toilet single-entry-field">
              <p className="entry-title">
                Toilet <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="toilet"
                value={formData.toilet}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">Please enter a number from 0 to 10.</p>
              <p className="tale-title">
                How many times he goes to toilet? 1-2 times are normal; more is
                not. Even none is also not good.
              </p>
            </div>

            {/* Overnight Sleeping */}
            <div className="Overnight_sleeping single-entry-field">
              <p className="entry-title">
                Overnight_sleeping <span className="star">*</span>
              </p>
              <input
                required
                type="number"
                name="overnightSleeping"
                value={formData.overnightSleeping}
                onChange={handleChange}
                placeholder="0-10"
              />
              <p className="tale-title">
                Please enter a number greater than or equal to 0.
              </p>
              <p className="tale-title">
                Does he sleep properly? Higher number is good and lower is bad.
              </p>
            </div>

            {/* Special Activity */}
            <div className="Special_activity single-entry-field">
              <p className="entry-title">Special_activity</p>
              <textarea
                className="border"
                name="specialActivity"
                value={formData.specialActivity}
                onChange={handleChange}
                cols="30"
                rows="3"
              ></textarea>
              <p className="tale-title">
                Any special, new or unusual thing he/she did today. Describe the
                activity, what, when, and how he/she did it.
              </p>
            </div>
          </div>

          <div className="data-btn-container">
            <input
              type="submit"
              className="data-btn"
              name="submit"
              id="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
      <Contact />
      <Footer />
      {(error.status || success.status) && (
        <div className="fixed z-50 inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-md w-full">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              {error.status ? (
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {error.status ? "Error" : "Success"}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  {error.status ? error.msg : success.msg}
                </p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataEntry;
