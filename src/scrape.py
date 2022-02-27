from requests import get
from bs4 import BeautifulSoup

URL = "https://courses.illinois.edu/schedule/DEFAULT/DEFAULT"


def get_rows(webpage):
    """
    Get the contents of the rows in the table
    """
    raw_rows = webpage.find_all('td')
    subject_codes = []
    subjects = []
    table_array = []
    for i in range(len(raw_rows)):
        row_text = raw_rows[i].text
        word = row_text.strip()
        if i % 2 == 0:
            subject_codes.append(word)
        else:
            subjects.append(word)
    table_array.append(subject_codes)
    table_array.append(subjects)
    return table_array


def create_data(course_array):
    """
    Create a dictionary with the k-v pair as code-subject
    """
    subject_codes = course_array[0]
    subjects = course_array[1]
    dataset = {}
    for i in range(len(subjects)):
        code = subject_codes[i]
        subject = subjects[i]
        dataset[code] = subject
    return dataset


if __name__ == "__main__":
    page_html = get(URL).text
    page = BeautifulSoup(page_html, features="html.parser")
    rows = get_rows(page)
    data = create_data(rows)
    print(data) # store this into firebase instead of printing
