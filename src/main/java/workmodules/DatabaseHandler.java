package workmodules;

import java.util.ArrayList;

import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.hibernate.cfg.Configuration;

import utils.Result;

public class DatabaseHandler {

    Configuration configuration = new Configuration();
    SessionFactory sessionFactory;

    public DatabaseHandler(){
        configuration.setPhysicalNamingStrategy(new CamelCaseToUnderscoresNamingStrategy());
        configuration.configure();
        configuration.addAnnotatedClass(Result.class);
        sessionFactory = configuration.buildSessionFactory();
    }

    public ArrayList<Result> load(){
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        
        Query q = session.createQuery("from Result", Result.class);
        ArrayList<Result> list = (ArrayList<Result>) q.getResultList();
        session.getTransaction().commit();
        return list;
    }

    public void persist (Result result){
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        
        session.persist(result);
        session.getTransaction().commit();
    }
    
}
