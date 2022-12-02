import { Connection } from "typeorm";
import { Authority } from "../entity/authority.entity";
import { Category } from "../entity/category.entity";
import { Role } from "../entity/role.entity";
import { Author } from "../entity/author.entity";

export const initialize = async (connection: Connection) => {
  /**
   * * Initialize data for Roles and Authorities
   *
   * * This code will be executed when server running first time.
   */

  const userAuthorities = [
    { authorityName: "CREATE_USER" },
    { authorityName: "READ_USER" },
    { authorityName: "UPDATE_USER" },
    { authorityName: "DELETE_USER" },
  ];

  const roleAuthorities = [
    { authorityName: "CREATE_ROLE" },
    { authorityName: "READ_ROLE" },
    { authorityName: "UPDATE_ROLE" },
    { authorityName: "DELETE_ROLE" },
  ];

  const bookAuthorities = [
    { authorityName: "CREATE_BOOK" },
    { authorityName: "READ_BOOK" },
    { authorityName: "UPDATE_BOOK" },
    { authorityName: "DELETE_BOOK" },
  ];

  const categoriesBookAuthorities = [
    { authorityName: "CREATE_BOOK_CATEGORY" },
    { authorityName: "READ_BOOK_CATEGORY" },
    { authorityName: "UPDATE_BOOK_CATEGORY" },
    { authorityName: "DELETE_BOOK_CATEGORY" },
  ];

  const authorBookAuthorities = [
    { authorityName: "CREATE_BOOK_AUTHOR" },
    { authorityName: "READ_BOOK_AUTHOR" },
    { authorityName: "UPDATE_BOOK_AUTHOR" },
    { authorityName: "DELETE_BOOK_AUTHOR" },
  ];

  await connection.manager.save(Authority, userAuthorities);

  await connection.manager.save(Authority, roleAuthorities);

  await connection.manager.save(Authority, bookAuthorities);

  await connection.manager.save(Authority, categoriesBookAuthorities);

  await connection.manager.save(Authority, authorBookAuthorities);

  await connection.manager.save(Role, [
    {
      roleName: "ADMIN",
      authorities: [
        ...userAuthorities,
        ...roleAuthorities,
        ...bookAuthorities,
        ...categoriesBookAuthorities,
        ...authorBookAuthorities,
      ],
    },
    { roleName: "MEMBER" },
  ]);

  await connection.manager.save(Category, [
    { categoryName: "IT" },
    { categoryName: "Akuntansi" },
    { categoryName: "Psikologi" },
    { categoryName: "Komunikasi" },
  ]);

  await connection.manager.save(Author, [
    { authorName: "Mada Sanjaya WS, Ph.D" },
    { authorName: "Wahana Komputer" },
    { authorName: "Abdul Kadir" },
    { authorName: "R.H. Sianipar" },
    { authorName: "Girindro Pringgo Digdo" },
    { authorName: "Heri Andrianto" },
    { authorName: "I Putu Agus Eka Pratama" },
    { authorName: "Prof.Dr.Widodo Budiharto, SSi, Mkom" },
    { authorName: "Rifkie Primartha" },
    { authorName: "Herman Yuliandoko x" },
    { authorName: "Mada Sanjaya WS" },
    { authorName: "Eriyanto" },
    { authorName: "Sulhan Setiawan" },
    { authorName: "Indrarini Dyah Irawati, M. T" },
    { authorName: "Mochamad Fajar Wicaksono" },
    { authorName: "Hardana & Radian Ferrari Isputra" },
    { authorName: "Jubilee" },
    { authorName: "Alan Nur Aditya" },
    { authorName: "Onno W Purbo" },
    { authorName: "Imam Catealy" },
    { authorName: "Syamsudin M Hermanto" },
    { authorName: "Widodo Budiharto Djoko Purwanto" },
    { authorName: "Agus Kurniawan" },
  ]);
};
