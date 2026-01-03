def generate_login_id(company_name: str, first_name: str, last_name: str, year: int, serial: int) -> str:
    # Format: LOI (first 2 letters of company) + (first 2 letters of first name + last name) + year + serial
    # Example: OIJODO20220001
    company_prefix = company_name[:2].upper() if company_name else "CO"
    name_part = (first_name[:2] + last_name[:2]).upper()
    return (
        company_prefix
        + name_part
        + str(year)
        + str(serial).zfill(4)
    )
