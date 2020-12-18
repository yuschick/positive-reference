export const fetchIllustrationUrlQuery = `*[_type == "illustration" && slug.current == $slug]{...image}[0]`;
