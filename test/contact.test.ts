import supertest from "supertest";
import { ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe('POST /api/contacts', () => {
  beforeEach(async () => {
    await UserTest.create()
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should create new contact', async () => {
    const response = await supertest(web).post('/api/contacts').set('X-API-TOKEN', 'test').send({
      first_name: 'Natalius Yongki',
      last_name: "Setiawan",
      email: "yongki@example.com",
      phone: "08999999"
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe("Natalius Yongki");
    expect(response.body.data.last_name).toBe("Setiawan");
    expect(response.body.data.email).toBe("yongki@example.com");
    expect(response.body.data.phone).toBe('08999999');
  });

  it('should reject create new contact if data is invalid', async () => {
    const response = await supertest(web).post('/api/contacts').set('X-API-TOKEN', 'test').send({
      first_name: '',
      last_name: "",
      email: "yongki",
      phone: "089999999999999999999999999999"
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe('GET /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should be able get contact', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.first_name).toBe(contact.first_name);
    expect(response.body.data.last_name).toBe(contact.last_name);
    expect(response.body.data.email).toBe(contact.email);
    expect(response.body.data.phone).toBe(contact.phone);
  });

  it('should reject get contact if  contact is not found', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .get(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should be able to update contact', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", 'test')
      .send({
        first_name: "yongki",
        last_name: "setiawan",
        email: "yongki@example.com",
        phone: "999999"
      });

      logger.debug(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(contact.id);
      expect(response.body.data.first_name).toBe("yongki");
      expect(response.body.data.last_name).toBe("setiawan");
      expect(response.body.data.email).toBe("yongki@example.com");
      expect(response.body.data.phone).toBe("999999");
  });

  it('should reject update contact if response is invalid', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .put(`/api/contacts/${contact.id}`)
      .set('X-API-TOKEN', 'test')
      .send({
        first_name: '',
        last_name: '',
        email: 'yongki',
        phone: '',
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe('DELETE /api/contacts/:contactId', () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should be able to remove contact', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it('should reject remove contact if contact is not found', async () => {
    const contact = await ContactTest.get();
    const response = await supertest(web)
      .delete(`/api/contacts/${contact.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  })
});

describe('GET /api/contacts', () => {
  beforeEach(async () => {
    await UserTest.create();
    await ContactTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it('should be able to serach contact', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to serach contact using name', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "es"
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to serach contact using email', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        email: ".com"
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to serach contact using phone', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        phone: "99"
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to serach contact no result', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        name: "salah"
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(0);
    expect(response.body.paging.size).toBe(10);
  });

  it('should be able to serach contact with paging', async () => {
    const response = await supertest(web)
      .get("/api/contacts")
      .query({
        page: 2,
        size: 1,
      })
      .set("X-API-TOKEN", "test");
    
    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
    expect(response.body.paging.current_page).toBe(2);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(1);
  });
})