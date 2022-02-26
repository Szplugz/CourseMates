var uni_db = {
    uniId1: {
        name: "UIUC",
        students: Set(), // set of ids
        classes: Set(), // set of all clases in the uni
    },
    uniId2: {
        name: "UCLA",
        students: Set(), // set of ids
        classes: Set(), // set of all clases in the uni
    }
}

var stud_db = {
    studId1: {
        ig_handle: "",
        uni_id: "",
        classes: Set(), // set of classnames
        // unnecessary: connections: Set() // set of ig handles following U followers
    },
    studId2: {
        ig_handle: "",
        uni_id: "",
        classes: Set(), // set of classnames
        // unnecessary: connections: Set() // set of ig handles following U followers
    }
}
