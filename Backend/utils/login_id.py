def generate_login_id(first_name: str, last_name: str, year: int, serial: int) -> str:
    return (
        first_name[:2].upper()
        + last_name[:2].upper()
        + str(year)
        + str(serial).zfill(4)
    )
