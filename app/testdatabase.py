import sqlite3
import database

def main():
    # print(database.check_login("admin", "admin"))
    # x = database.display_score("admin")
    # print(x)

    # print(database.update_score("admin", 15))
    database.delete_all()
    y = database.display()
    print(y)

if __name__ == "__main__":
    main()
