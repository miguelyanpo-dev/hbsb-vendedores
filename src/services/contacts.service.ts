import type { Pool } from 'pg';

export type SellerContact = {
  id_contact: number;
  contact_name: string | null;
  contact_image: string | null;
};

export const getSellerContacts = async (db: Pool): Promise<SellerContact[]> => {
  const query = `
    SELECT
      id_contact,
      contact_name,
      contact_image
    FROM contacts
    WHERE is_seller = true
      AND deleted_at IS NULL
    ORDER BY contact_name ASC
  `;

  const { rows } = await db.query<SellerContact>(query);
  return rows;
};
