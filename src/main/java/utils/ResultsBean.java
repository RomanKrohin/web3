package utils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Transaction;
import utils.Result;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.mapping.Array;

import lombok.Data;

@ManagedBean
@SessionScoped
@Data
public class ResultsBean {

    private Result newResult= new Result();
    private List<Result> results= new ArrayList<Result>();
    Configuration configuration = new Configuration();
    SessionFactory sessionFactory;

    public ResultsBean(){
        configuration.setPhysicalNamingStrategy(new CamelCaseToUnderscoresNamingStrategy());
        configuration.configure();
        configuration.addAnnotatedClass(Result.class);
        sessionFactory = configuration.buildSessionFactory();
        results= loadCollection();
    }

    public void addNewResult(){
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        double start = System.nanoTime();
        newResult.setValue(String.valueOf(validate(Double.valueOf(newResult.getX()), Double.valueOf(newResult.getY()), Double.valueOf(newResult.getR()))));
        double execTime = Math.round(((System.nanoTime() - start) * 0.00001) * 100.0) / 100.0;
        newResult.setExecTime(String.valueOf(execTime));
        newResult.setTime(String.valueOf(LocalDate.now()));
        results.add(newResult);
        session.persist(newResult);
        newResult= new Result();
        session.getTransaction().commit();
    }

    private Boolean validate(Double x, Double y, Double r){
        if (x>=0 && y>=0 && x<=r/2 && y<=r){
            return true;
        }
        if (x<=0 && y<=0 && x>=-r && y>=x-r){
            return true;
        }
        if (x<=0 && y>=0 && Math.sqrt(x*x+y*y)<=r){
            return true;
        }
        return false;
    }

    public Result getNewResult(){
        return this.newResult;
    }

    public ArrayList<Result> loadCollection(){
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        
        Query q = session.createQuery("from Result", Result.class);
        ArrayList<Result> list = (ArrayList<Result>) q.getResultList();
        session.getTransaction().commit();
        return list;
    }
}
