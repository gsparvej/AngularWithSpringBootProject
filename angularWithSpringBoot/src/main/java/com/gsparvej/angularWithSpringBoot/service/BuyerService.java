package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.Buyer;
import com.gsparvej.angularWithSpringBoot.repository.IBuyerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {

    @Autowired
    private IBuyerRepo buyerRepo;

    public List<Buyer> getAllBuyers() {
        return buyerRepo.findAll();
    }
    public Buyer saveBuyer(Buyer buyer) {
        return buyerRepo.save(buyer);
    }
    public void deleteById(Integer id) {
        buyerRepo.deleteById(id);
    }
}
