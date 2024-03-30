import streamlit as st
import numpy as np
import datetime
import time
from airline_reservation import *
from utils import *


def main():
    images = []
    images_path = [
        "media/images/cheerful-african-guy-with-narrow-dark-eyes-fluffy-hair-dressed-elegant-white-shirt.jpg",
        "media/images/new passport pic.png",
        "media/images/portrait-african-american-man.jpg",
        "media/images/young-man-posing-studio-medium-shot.jpg",
    ]
    for path in images_path:

        with open(f"{path}", "rb") as file:
            image = file.read()
            images.append(image)
    # if "balloons_state" not in st.session_state:
    #     st.balloons()
    #     st.snow()
    #     st.session_state.balloons_state = True

    time.sleep(1)
    if "airline" not in st.session_state:
        st.session_state.airline = AirlineReservation()

    title = st.title("Airline Ticket Reservation System")
    # st.text(" ")
    st.divider()

    st.text(" ")

    options = [
        "Reserve a ticket",
        "Cancel a reservation",
        "Check reservation",
        "Display passengers",
        "Display analytics",
    ]
    choice = st.sidebar.selectbox("# Select an option", options)
    for i in range(8):
        st.sidebar.text(" ")

    with st.sidebar.container(height=100):

        st.markdown(
            "<h1 style='text-align: center;'>Team Members</h1>", unsafe_allow_html=True
        )
        # st.title(":rainbow[Team Members]")
        st.text(" ")

    with st.sidebar.container(height=300):

        # st.sidebar()

        with st.container():
            st.image(
                image=images,
                caption=["Enimil", "Anna", "Kwaku", "Araba"],
            )

    travel_classes = (
        "Economy Class",
        "Premium Economy Class",
        "Business Class",
        "First Class",
    )
    if choice == "Reserve a ticket":
        st.container()
        with st.form("my_form", clear_on_submit=True):

            name = st.text_input(
                "Enter passenger's name:", placeholder="Kelvin Enimil"
            ).strip()
            email = st.text_input(
                "Enter passenger's email", placeholder="kelvin@st.knust.edu.gh"
            ).strip()
            class_choice = st.selectbox("Select the time of travel", travel_classes)

            departure_date = st.date_input("Select the flight date")
            departure_time = st.time_input(
                "Select the time of flight",
            )

            destination_context = ["Kumasi", "Tamale", "Takoradi", "Sunyani"]
            origin_context = ["Accra"]
            origin = st.selectbox("Select departure city", options=origin_context)
            destination = st.selectbox(
                "Select destination", options=destination_context
            )

            data = {
                "name": name,
                "email": email,
                "class": class_choice,
                "origin": origin,
                "destination": destination,
                "departure date": departure_date,
                "departure time": departure_time,
            }

            #  submit button.
            submitted = st.form_submit_button("Submit")

        if submitted:
            handle_submit(input=data)

    elif choice == "Cancel a reservation":
        with st.spinner("Wait for it..."):
            time.sleep(1)
            display_passengers(st.session_state.airline)

        with st.container():

            name = st.text_input("Enter passenger name to cancel reservation:")

            if st.button("Cancel Reservation"):

                if cancel_reservation(st.session_state.airline, name):
                    st.rerun()
                else:
                    error = st.error(f"No reservation found for {name}.")
                    time.sleep(3)
                    error.empty()

        display_cancel_code()

    elif choice == "Check reservation":
        name = st.text_input("Enter passenger name to check reservation:")
        if st.button("Check"):
            check_reservation(st.session_state.airline, name)

        display_check_code()

    elif choice == "Display passengers":
        display_passengers(st.session_state.airline)
        display_passengers_code()

    else:
        title.empty()
        generate_class_distribution_chart(st.session_state.airline)


if __name__ == "__main__":
    main()
