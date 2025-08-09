package it.unito.cloudnative.ticketing.repository;

import it.unito.cloudnative.ticketing.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}