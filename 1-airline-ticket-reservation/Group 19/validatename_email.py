import re

def validate_name(name):
    # Regular expression pattern to match a valid name
    pattern = r'^[A-Za-z\s\'-]+$'
    # ^ : Start of the string
    # [A-Za-z] : Match any uppercase or lowercase letter
    # \s : Match any whitespace character (space, tab, newline)
    # \' : Match apostrophe
    # - : Match hyphen
    # + : Match one or more occurrences of the preceding pattern
    # $ : End of the string

    # Compile the regular expression pattern
    regex = re.compile(pattern)

    # Check if the name matches the pattern
    if regex.match(name):
        return True #returns True if name is valid 
    else:
        return False #returns False if name is invalid 

import re

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    # Explanation of the pattern:
    # ^ : Start of the string
    # [a-zA-Z0-9._%+-]+ : Match one or more occurrences of letters, digits, dots, underscores, percent signs, plus signs, or hyphens
    # @ : Match the '@' symbol
    # [a-zA-Z0-9.-]+ : Match one or more occurrences of letters, digits, dots, or hyphens (domain name)
    # \. : Match the '.' symbol (before the domain extension)
    # [a-zA-Z]{2,} : Match two or more occurrences of letters (domain extension)
    # $ : End of the string

    # Compile the regular expression pattern
    regex = re.compile(pattern)

    # Check if the email matches the pattern
    if regex.match(email):
        return True
    else:
        return False



