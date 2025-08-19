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
import java.util.stream.Collectors;

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
        return orderRepo.findAll().stream()
                .map(or -> {
                    OrderResponseDTO dto = new OrderResponseDTO();
                    dto.setId(or.getId());
                    dto.setDeliveryDate(or.getDeliveryDate());

                    // Map BomStyle
                    if (or.getBomStyle() != null) {
                        BomStyle bomStyle = or.getBomStyle();
                        dto.setBomStyle(new BomStyleResponseDTO(
                        ));
                    }

                    // Map Buyer
                    if (or.getBuyer() != null) {
                        Buyer buyer = or.getBuyer();
                        dto.setBuyer(new BuyerResponseDTO(
                                buyer.getId(),
                                buyer.getName()
                        ));
                    }

                    return dto;
                })
                .collect(Collectors.toList()); // safer for Java 8/11
    }

}
