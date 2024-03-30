import streamlit as st
import numpy as np
import datetime
import time
from airline_reservation import *

import pandas as pd
import matplotlib.pyplot as plt


def generate_class_distribution_chart(airline):
    """
    Generate a bar chart for the distribution of classes chosen by passengers.

    Parameters:
        data (dict): Dictionary containing booking data with 'class' as one of the keys.

    Returns:
        None
    """
    current = airline.head
    rows = []  # List to hold each row as a dictionary
    counter = 1
    if not current:
        st.error("No reservation for passenger")
        return

    while current:
        # Each row is represented as a dictionary with headers as keys
        row = {
            "No": counter,
            "Passenger Name": current.data["name"],
            "Email": current.data["email"],
            "Travel Type": current.data["class"],
            "Origin": current.data["origin"],
            "Destination": current.data["destination"],
            "Departure Date": current.data["departure date"],
            "Departure Time": current.data["departure time"],
        }
        rows.append(row)
        counter += 1
        current = current.next

    # Convert data to DataFrame
    json_data = {
        "No": [],
        "Passenger Name": [],
        "Email": [],
        "Travel Type": [],
        "Origin": [],
        "Destination": [],
        "Departure Date": [],
        "Departure Time": [],
    }
    for record in rows:
        for key, value in record.items():
            print(key)
            json_data[key].append(value)

    print(json_data)
    df = pd.DataFrame(rows)

    # Generate chart
    st.title(":rainbow[Class Preference Distribution]")
    st.text(" ")
    class_counts = df['Travel Type'].value_counts()
    fig, ax = plt.subplots()
    class_counts.plot(kind='bar', ax=ax)
    plt.xlabel("Class")
    plt.ylabel("Number of Passengers")
    plt.title("Class Preference Distribution")
    st.pyplot(fig)


def reserve_ticket(airline, data):

    new_node = Node(data)
    if not airline.head or airline.head.data["name"] > data["name"]:
        new_node.next = airline.head
        airline.head = new_node
    else:
        current = airline.head
        while current.next and current.next.data["name"] < data["name"]:
            current = current.next
        new_node.next = current.next
        current.next = new_node


def cancel_reservation(airline, name):
    name = name.strip()
    if not airline.head:
        st.error("No reservations found.")
        return False
    if (
        airline.head.data["name"].upper() == name
        or airline.head.data["name"].lower() == name
        or airline.head.data["name"].title() == name
    ):
        airline.head = airline.head.next

        success = st.success(f"Reservation for {name} is cancelled.")
        time.sleep(3)
        success.empty()
        return True
    current = airline.head
    while current.next:
        if (
            current.next.data["name"] == name.title()
            or current.next.data["name"] == name.upper()
            or current.next.data["name"] == name.lower()
        ):
            current.next = current.next.next
            st.write(f"Reservation for {name} cancelled.")
            return True
        current = current.next
    return False


def check_reservation(airline, name):
    current = airline.head
    while current:
        if (
            name in current.data["name"].upper()
            or name in current.data["name"].title()
            or name in current.data["name"].lower()
        ):
            st.dataframe(current.data)
            st.write(f"Reservation found for **{name}**.")
            return
        current = current.next
    st.write(f"No reservation found for *{name}*.")


def display_passengers(airline):
    current = airline.head
    rows = []  # List to hold each row as a dictionary
    counter = 1
    if not current:
        st.write("No reservations found.")
        return
    st.write("Passengers:")
    while current:
        # Each row is represented as a dictionary with headers as keys
        row = {
            "No.": counter,
            "Passenger Name": current.data["name"],
            "Email": current.data["email"],
            "Travel Type": current.data["class"],
            "Origin": current.data["origin"],
            "Destination": current.data["destination"],
            "Departure Date": current.data["departure date"],
            "Departure Time": current.data["departure time"],
        }
        rows.append(row)
        counter += 1
        current = current.next
    # Creating columns to center the dataframe
    col1, col2, col3 = st.columns([1, 20, 1])
    with col2:  # This places the dataframe in the middle column
        st.dataframe(rows, use_container_width=True)


def display_reservation_code():
    st.markdown("### Reservation Code")
    st.code(
        """
def reserve_ticket(airline, name):
    if not name:
        st.write("Please enter a valid name.")
        return
    new_node = Node(name)
    if not airline.head or airline.head.name > name:
        new_node.next = airline.head
        airline.head = new_node
    else:
        current = airline.head
        while current.next and current.next.name < name:
            current = current.next
        new_node.next = current.next
        current.next = new_node
    """
    )


def display_cancel_code():
    st.markdown("### Cancel Reservation Code")
    st.code(
        """
def cancel_reservation(airline, name):
    if not airline.head:
        st.error("No reservations found.")
        return
    if airline.head.name == name:
        airline.head = airline.head.next
        
        success = st.success(f"Reservation for {name} is cancelled.")
        time.sleep(3)
        success.empty() 
        return
    current = airline.head
    while current.next:
        if current.next.name == name:
            current.next = current.next.next
            st.write(f"Reservation for {name} cancelled.")
            return
        current = current.next
    st.write(f"No reservation found for {name}.")
    """
    )


def display_check_code():
    st.markdown("### Check Reservation Code")
    st.code(
        """
def check_reservation(airline, name):
    current = airline.head
    while current:
        if current.name == name:
            st.write(f"Reservation found for **{name}**.")
            return
        current = current.next
    st.write(f"No reservation found for *{name}*.")
    """
    )


def handle_submit(input):
    if input:
        if not input or input["name"] == "":
            st.error("Please enter a valid data.")
            return
        reserve_ticket(st.session_state.airline, input)
        # Display success message for 3 seconds
        success = st.success(
            f"Reservation for {input['name']} @ {datetime.datetime.now().strftime('%H:%M:%S')} is successful."
        )
        time.sleep(3)
        success.empty()
    else:
        success = st.error(f"Wrong input, please enter a valid name.")
        time.sleep(3)
        success.empty()
    display_reservation_code()


def display_passengers_code():
    st.markdown("### Display Passengers Code")
    st.code(
        """
def display_passengers(airline):
    current = airline.head
    rows = [] 
    counter = 1
    if not current:
        st.write("No reservations found.")
        return
    st.write("Passengers:")
    while current:
        row = {"No.": counter, "Passenger Name": current.name}
        rows.append(row)
        counter += 1
        current = current.next
    col1, col2, col3 = st.columns([1,2,1])  # Adjust the ratio as needed
    with col2:  
        st.dataframe(rows, use_container_width=True)
    """
    )
