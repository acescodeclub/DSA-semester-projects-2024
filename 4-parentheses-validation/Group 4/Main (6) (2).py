from PySide6 import QtWidgets, QtGui
from PySide6.QtGui import QImageReader
from PySide6.QtCore import Qt
import pytesseract as Tess
from PIL import Image

#Implement Image-to-text
Tess.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.isEmpty():
            return self.items.pop()
        else:
            raise IndexError("Stack is empty")

    def peek(self):
        if not self.isEmpty():
            return self.items[-1]
        else:
            raise IndexError("Stack is empty")

    def isEmpty(self):
        return len(self.items) == 0

class ParenthesesChecker:
    def __init__(self, input_string):
        self.input_string = input_string
        self.opening_brackets = {'(', '[', '{'}
        self.closing_brackets = {')', ']', '}'}
        self.element_list = {']','[','{','}','(',')'}
        self.bracket_pairs = {'(': ')', '[': ']', '{': '}'}
    
    def read_file(self, file_path):
        # Read content of file and extract specified parenthesis characters
        with open(file_path, 'r') as file:
            file_content = file.read()
            self.input_string = ''.join(char for char in file_content if char in self.element_list)
        
    def is_parentheses(self):
        # Check for presence of parentheses
        return any(element in self.input_string for element in self.element_list)

    def check_balanced_parentheses(self):
        # Check for balanced parentheses
        stack = Stack()
        offending_indexes = []

        for i, char in enumerate(self.input_string):
            if char in self.opening_brackets:
                stack.push((char, i))
            elif char in self.closing_brackets:
                if stack.isEmpty():
                    offending_indexes.append(i)
                else:
                    top_bracket, top_index = stack.pop()
                    if self.bracket_pairs[top_bracket] != char:
                        offending_indexes.append(i)
                        offending_indexes.append(top_index)
        while not stack.isEmpty():
            top_bracket, top_index = stack.pop()
            offending_indexes.append(top_index)

        return not offending_indexes, offending_indexes

    def visualize_matching(self):
        # Visualize parentheses matching and nesting
        stack = Stack()
        result = []

        for char in self.input_string:
            if char in self.opening_brackets:
                stack.push(char)
                result.append((char, "normal"))
            elif char in self.closing_brackets:
                if stack.isEmpty():
                    result.append((char, "error"))
                else:
                    top_bracket = stack.pop()
                    if self.bracket_pairs[top_bracket] != char:
                        result.append((char, "error"))
                        result.append((top_bracket, "error"))
                    else:
                        result.append((char, "normal"))
            else:
                result.append((char, "normal"))

        while not stack.isEmpty():
            top_bracket = stack.pop()
            result.append((top_bracket, "error"))

        return result
    
class MainWindow(QtWidgets.QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Parentheses Checker")
        self.setStyleSheet("background-color: rgb(240,240,240);")
        
        button_style = (
        "QPushButton {"
        "   background-color: rgb(118, 200, 255);"  # Background color
        "   border-style: solid;"         # Border style
        "   border-width: 3px;"           # Border width
        "   border-color: rgb(118, 200, 255);"  # Border color
        "   border-radius: 5px;"          # Rounded corners
        "   color: white;"                # Text color
        "   font-family: Poppins;"        # Font family
        "   padding: 5px 10px;"           # Padding
        "}"
        "QPushButton:hover {"
        "   background-color: rgb(100, 180, 255);"   # Hover background color
        "   border-color: rgb(100, 180, 255);"       # Hover border color
        "}"
        "QPushButton:pressed {"
        "   background-color: rgb(80, 160, 255);"   # Pressed background color
        "   border-color: rgb(80, 160, 255);"       # Pressed border color
        "}"
        )
        
        
        submit_button_style = (
        "QPushButton {"
        "   background-color: rgb(28, 127, 52);"  # Background color
        "   border-style: solid;"         # Border style
        "   border-width: 3px;"           # Border width
        "   border-color: rgb(8, 97, 30);"  # Border color
        "   border-radius: 5px;"          # Rounded corners
        "   color: white;"                # Text color
        "   font-family: Poppins;"        # Font family
        "   padding: 5px 10px;"           # Padding
        "}"
        "QPushButton:hover {"
        "   background-color: rgb(100, 255, 180);"   # Hover background color
        "   border-color: rgb(100, 255, 180);"       # Hover border color
        "}"
        "QPushButton:pressed {"
        "   background-color: rgb(80, 160, 255);"   # Pressed background color
        "   border-color: rgb(80, 160, 255);"       # Pressed border color
        "}"
        )

        central_widget = QtWidgets.QWidget()
        self.setCentralWidget(central_widget)
        layout = QtWidgets.QVBoxLayout(central_widget)

        self.realtime_toggle = QtWidgets.QCheckBox("REALTIME CHECK")
        self.realtime_toggle.setChecked(True)  # Initially checked
        self.realtime_toggle.setStyleSheet("color: black; font-family: Poppins")
        layout.addWidget(self.realtime_toggle)

        self.file_button = QtWidgets.QPushButton("SUBMIT FILE")  # New button for submitting a file
        self.file_button.setStyleSheet(button_style)
        layout.addWidget(self.file_button)

        self.input_label = QtWidgets.QLabel("Input:")
        self.input_label.setStyleSheet("color: black; font-family: Poppins" )
        layout.addWidget(self.input_label)
        
        self.input_entry = QtWidgets.QLineEdit()
        self.input_entry.setStyleSheet("background-color :rgb(220,220,220); border: 1px solid rgb(200,200,200);")
        layout.addWidget(self.input_entry)
        
        self.clear_button = QtWidgets.QPushButton("CLEAR")
        self.clear_button.setEnabled(True)  # Initially Enabled
        self.clear_button.setStyleSheet(button_style)
        layout.addWidget(self.clear_button)

        self.check_button = QtWidgets.QPushButton("CHECK PARENTHESES")
        self.check_button.setEnabled(False)  # Initially disabled
        self.check_button.setStyleSheet(submit_button_style)
        layout.addWidget(self.check_button)

        self.output_label = QtWidgets.QLabel("Output:")
        self.output_label.setStyleSheet("color: black; font-family: Poppins")
        layout.addWidget(self.output_label)
        self.output_text = QtWidgets.QTextEdit()
        self.output_text.setStyleSheet("background-color :rgb(220,220,220); border: 1px solid rgb(200,200,200);")
        self.output_text.setReadOnly(True)
        layout.addWidget(self.output_text)
        
        self.fix_button = QtWidgets.QPushButton("Fix Parentheses")
        self.fix_button.setEnabled(True)  # Initially disabled
        self.fix_button.setStyleSheet(button_style)
        layout.addWidget(self.fix_button)
        
        self.output_label = QtWidgets.QLabel("Output:")
        self.output_label.setStyleSheet("color: black; font-family: Poppins")
        layout.addWidget(self.output_label)
        self.output2_text = QtWidgets.QTextEdit()
        self.output2_text.setStyleSheet("background-color :rgb(220,220,220); border: 1px solid rgb(200,200,200);")
        self.output2_text.setReadOnly(True)
        layout.addWidget(self.output2_text)

        # Set default text color to black
        self.output_text.setTextColor(QtGui.QColor("black"))
        self.realtime_toggle.stateChanged.connect(self.toggle_realtime_checking)  # Connect stateChanged signal to toggle_realtime_checking
        self.input_entry.textChanged.connect(self.real_time_parentheses_check)  # Connect textChanged signal to real_time_parentheses_check
        self.check_button.clicked.connect(self.check_parentheses)
        self.clear_button.clicked.connect(self.input_entry.clear)
        self.clear_button.clicked.connect(self.output_text.clear)
        self.clear_button.clicked.connect(self.output2_text.clear)

        self.fix_button.clicked.connect(self.fix_parentheses)
        self.file_button.clicked.connect(self.open_file_dialog)  # Connect file_button to open_file_dialog
                   
    def toggle_realtime_checking(self, state):
        if state == Qt.Checked:
            self.check_button.setEnabled(False)  # Disable check button if real-time toggle is on
        else:
            self.check_button.setEnabled(True)  # Enable check button if real-time toggle is off

    def real_time_parentheses_check(self):
        input_string = self.input_entry.text()
        toggle = self.realtime_toggle.isChecked()

        if toggle:
            if input_string:
                parentheses_checker = ParenthesesChecker(input_string)
                balanced, offending_indexes = parentheses_checker.check_balanced_parentheses()
                parentheses_present = parentheses_checker.is_parentheses()
                
                if not parentheses_present:
                    self.output_text.clear()
                    self.output_text.insertPlainText("There are no parentheses present.")
                elif balanced:
                    self.output_text.clear()
                    self.output_text.setTextColor(QtGui.QColor("green"))  # Change text color to green for balanced parentheses
                    self.output_text.insertPlainText("The input string is balanced.\n")                
                    self.output_text.insertPlainText(input_string)
                else:
                    visualization = parentheses_checker.visualize_matching()

                    self.output_text.clear()
                    self.output_text.setTextColor(QtGui.QColor("black"))  # Reset text color to black for normal text and offending parentheses
                    self.output_text.insertPlainText("The input string does not contain balanced parentheses.\n")

                    formatted_text = input_string
                    for idx in sorted(offending_indexes, reverse=True):
                        formatted_text = formatted_text[:idx] + "<font color='red'>" + formatted_text[idx] + "</font>" + formatted_text[idx+1:]
                    self.output_text.insertHtml(formatted_text)
            else:
                self.output_text.clear()  # Clear output text if input string is empty
                
    def check_parentheses(self):
        input_string = self.input_entry.text()
        toggle = self.realtime_toggle.isChecked()
        
        if not toggle:
            if input_string:
                parentheses_checker = ParenthesesChecker(input_string)
                balanced, offending_indexes = parentheses_checker.check_balanced_parentheses()
                parentheses_present = parentheses_checker.is_parentheses()
                
                if not parentheses_present:
                    self.output_text.clear()
                    self.output_text.setTextColor(QtGui.QColor("black"))
                    self.output_text.insertPlainText("There are no parentheses present.")
                    
                elif balanced:
                    self.output_text.clear()
                    self.output_text.setTextColor(QtGui.QColor("green"))  # Change text color to green for balanced parentheses
                    self.output_text.insertPlainText("The input string contains balanced parentheses.")
                else:
                    visualization = parentheses_checker.visualize_matching()

                    self.output_text.clear()
                    self.output_text.setTextColor(QtGui.QColor("black"))  # Reset text color to black for normal text and offending parentheses
                    self.output_text.insertPlainText("The input string does not contain balanced parentheses.\n")

                    formatted_text = input_string
                    for idx in sorted(offending_indexes, reverse=True):
                        formatted_text = formatted_text[:idx] + "<font color='red'>" + formatted_text[idx] + "</font>" + formatted_text[idx+1:]
                    self.output_text.insertHtml(formatted_text)
            else:
                self.output_text.clear()  # Clear output text if input string is empty

    def fix_parentheses(self):
        input_string = self.input_entry.text()
        if input_string:
            parentheses_checker = ParenthesesChecker(input_string)
            balanced, offending_indexes = parentheses_checker.check_balanced_parentheses()
            parentheses_present = parentheses_checker.is_parentheses()
            
            if not parentheses_present:
                self.output2_text.clear()
                self.output2_text.setTextColor(QtGui.QColor("black"))
                self.output2_text.insertPlainText("No parentheses detected. \n")
                
            elif not balanced:
                # Errors detected, proceed with fixing
                fixed_string = self.fix_errors(input_string, offending_indexes)
                self.output2_text.clear()
                self.output2_text.setTextColor(QtGui.QColor("black"))
                self.output2_text.insertPlainText("Fixed input string:\n")
                
                formatted_text2 = fixed_string
                for idx in sorted(offending_indexes, reverse=True):
                    if 0 <= idx < len(formatted_text2):
                        formatted_text2 = formatted_text2[:idx] + "<font color='black'>" + formatted_text2[idx] + "</font>" + formatted_text2[idx+1:]
                self.output2_text.insertHtml(formatted_text2)
            else:
                # No errors detected, inform the user
                self.output2_text.clear()
                self.output2_text.setTextColor(QtGui.QColor("black"))
                self.output2_text.insertPlainText("The input string is already balanced.")
        else:
            # No input string provided
            self.output2_text.clear()
            self.output2_text.insertPlainText("Please enter an input string.")


    def fix_errors(self, input_string, offending_indexes):
        fixed_string = list(input_string)
        self.bracket_pairs = {'(': ')', '[': ']', '{': '}'}
        self.element_list = {']','[','{','}','(',')'}
        count = {}

        for character in input_string:
            if character in self.element_list:
                count.setdefault(character, 0)
                count[character] = count[character] + 1

        # Check if all parentheses are of equal number to their pair
        balanced_count = all(count.get(opening, 0) == count.get(closing, 0) for opening, closing in self.bracket_pairs.items())

        if not balanced_count:
            # Remove excess brackets if the count of each bracket type is not balanced
            for idx in sorted(offending_indexes, reverse=True):
                if 0 <= idx < len(fixed_string):
                    fixed_string.pop(idx)
        else:
            reverse_bracket_pairs = {v: k for k, v in self.bracket_pairs.items()}
            # Replace unmatched brackets with their pair
            for idx in sorted(offending_indexes):
                if 0 <= idx < len(fixed_string):
                    bracket = fixed_string[idx]
                    if bracket in self.bracket_pairs.keys():
                        pair = self.bracket_pairs[bracket]
                    else:
                        pair = reverse_bracket_pairs.get(bracket)
                    if pair:
                        fixed_string[idx] = pair

        return ''.join(fixed_string)
    
    def open_file_dialog(self):
        
        file_dialog = QtWidgets.QFileDialog()
        file_path, _ = file_dialog.getOpenFileName(self, 'Open File', '', 'Text Files (*.txt);; Image Files (*.jpeg )')

        if file_path:
            if file_path.endswith('.txt'):
                # Read content from the text file
                with open(file_path, 'r') as file:
                    content = file.read()
                    self.input_entry.setText(content)
            else:
                # Check if it's an image file
                image_formats = QImageReader.supportedImageFormats()
                image_extensions = [f".{format.data().decode()}" for format in image_formats]
                if any(file_path.lower().endswith(ext) for ext in image_extensions):
                    # Use pytesseract to extract text from the image
                    try:
                        image = Image.open(file_path)
                        extracted_text = Tess.image_to_string(image)
                        self.input_entry.setText(extracted_text)
                    except Exception as e:
                        print(f"Error extracting text from image: {e}")
                else:
                    print("Unsupported file type")
                    
    def dragEnterEvent(self, event):
        if event.mimeData().hasUrls():
            event.acceptProposedAction()

    def dropEvent(self, event):
        urls = event.mimeData().urls()
        if urls:
            file_path = urls[0].toLocalFile()
            print("File path:", file_path)
            
            if file_path.endswith('.txt'):
                # Read content from the text file that ends with the file name extensions
                with open(file_path, 'r') as file:
                    content = file.read()
                    self.input_entry.setText(content)
            else:
                # Check if it's an image file from the supported image formats
                image_formats = QImageReader.supportedImageFormats()
                image_extensions = [f".{format.data().decode()}" for format in image_formats]
                if any(file_path.lower().endswith(ext) for ext in image_extensions):
                    # Use pytesseract to extract text from the image
                    try:
                        image = Image.open(file_path)
                        extracted_text = Tess.image_to_string(image)
                        self.input_entry.setText(extracted_text)
                    except Exception as e:
                        print(f"Error extracting text from image: {e}")
                else:
                    print("Unsupported file type")

if __name__ == "__main__":
    app = QtWidgets.QApplication([])
    window = MainWindow()
    window.setFixedSize(500,700)
    window.show()
    app.exec()
