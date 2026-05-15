def extract_url_features(url):

    suspicious_keywords = [
        "login",
        "verify",
        "bank",
        "secure",
        "account",
        "update",
        "alert",
        "wallet"
    ]

    return {

        "url_length": len(url),

        "valid_url":
            1 if url.startswith("http")
            else 0,

        "at_symbol":
            1 if "@" in url
            else 0,

        "sensitive_words_count":
            sum(
                keyword in url.lower()
                for keyword in suspicious_keywords
            ),

        "path_length":
            url.count("/"),

        "isHttps":
            1 if url.startswith("https://")
            else 0,

        "nb_dots":
            url.count("."),

        "nb_hyphens":
            url.count("-"),

        "nb_and":
            url.count("&"),

        "nb_or":
            url.count("|"),

        "nb_www":
            url.lower().count("www"),

        "nb_com":
            url.lower().count(".com"),

        "nb_underscore":
            url.count("_")
    }