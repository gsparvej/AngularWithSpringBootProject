package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.dto.*;
import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import com.gsparvej.angularWithSpringBoot.repository.IBuyerRepo;
import com.gsparvej.angularWithSpringBoot.repository.IEmployeeRepo;
import com.gsparvej.angularWithSpringBoot.repository.IOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private IBomStyleRepo bomStyleRepo;

    @Autowired
    private IBuyerRepo buyerRepo;

    @Autowired
    private IEmployeeRepo employeeRepo;

    @Autowired
    private IOrderRepo orderRepo;


    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }


    public Optional<Order> getOrderById(Integer id) {
        return orderRepo.findById(id);
    }
    public Order saveOrUpdate(Order order, BomStyle bomStyle, Buyer buyer) {
        order.setBomStyle(bomStyle);
        order.setBuyer(buyer);
        return orderRepo.save(order);

    }
    public void deleteById(Integer id) {
        orderRepo.deleteById(id);
    }
    public Order getProfileById(Integer id) {
        return orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }


    public List<OrderResponseDTO> getAllOrderResponseDTOS() {
        return orderRepo.findAll().stream().map(or -> {
            OrderResponseDTO dto = new OrderResponseDTO();
            dto.setId(or.getId());
            dto.setDeliveryDate(or.getDeliveryDate());

            BomStyle bomStyle = or.getBomStyle();
            if (bomStyle != null) {
                BomStyleResponseDTO bomStyleResponseDTO = new BomStyleResponseDTO();
                bomStyleResponseDTO.setId(bomStyle.getId());
                bomStyleResponseDTO.setStyleCode(bomStyle.getStyleCode());
                dto.setBomStyle(bomStyleResponseDTO);

            }

            Buyer buyer = or.getBuyer();
            if (buyer != null) {
                BuyerResponseDTO buyerResponseDTO = new BuyerResponseDTO();
                buyerResponseDTO.setId(buyer.getId());
                buyerResponseDTO.setName(buyer.getName());
                dto.setBuyer(buyerResponseDTO);

            }


            return dto;
        }).toList();
    }
}
