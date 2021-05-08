package com.esprit.springjwt.security.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.esprit.springjwt.models.User;
import com.esprit.springjwt.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(user);
	}
	
	 public void DeleteUser(Long user) {
	        userRepository.deleteById(user);
	    }
	
	 
	 public List<User> GetUser() {
	        List<User> user = new ArrayList<>();
	        userRepository.findAll().forEach(user::add);
	        return user;
	    }
	 
	 public void UpdateUser(Long id, User user) {
	        User userFromDb = userRepository.findById(id).get();
	        userFromDb.setPassword(user.getPassword());
	        userFromDb.setUsername(user.getUsername());
	        userFromDb.setEmail(user.getEmail());
	        userRepository.save(userFromDb);
	 }
	 
	 public void UpdateUserAdmin(Long id, User user) {
	        User userFromDb = userRepository.findById(id).get();
	        userFromDb.setPassword(user.getPassword());
	        userFromDb.setUsername(user.getUsername());
	        userFromDb.setEmail(user.getEmail());
	        userFromDb.setRoles(user.getRoles());
	        userRepository.save(userFromDb);
	 }
	 public User getUserById(Long id) {
	        return userRepository.findById(id).get();
	    }
	 public List<User>getAllUsers (){
			return userRepository.findAll();
		}
	 public List<User> getAllUser()   
	 {  
	 List<User> user = new ArrayList<User>();  
	 userRepository.findAll().forEach(user1 -> user.add(user1));  
	 return user;  
	 }  
}
