package com.station.services;

import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.stereotype.Service;

@Service
public class EmailSender {



	public int sendEmail(String emailId) {
		int random = (int) (Math.random() * 90000 + 10000);

		Properties prop = new Properties();
		prop.put("mail.smtp.host", "smtp.gmail.com");
		prop.put("mail.smtp.port", "587");
		prop.put("mail.smtp.auth", "true");
		prop.put("mail.smtp.starttls.enable", "true");

		try {
			Session session = Session.getInstance(prop, new Authenticator() {
				@Override
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication("covaxsystem@gmail.com", "groupg1q!");
				}
			});
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("covaxsystem@gmail.com"));
			message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(emailId));
			message.setSubject("Security Token for Covax Application");

			String msg = "Please find the below security code: <br> " + random + " <br> Do not share it with anyone!";

			MimeBodyPart mimeBodyPart = new MimeBodyPart();
			mimeBodyPart.setContent(msg, "text/html");

			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(mimeBodyPart);

			message.setContent(multipart);

			Transport.send(message);
		} catch (MessagingException e) {
			random = -1;
		}
		return random;
	}

}
