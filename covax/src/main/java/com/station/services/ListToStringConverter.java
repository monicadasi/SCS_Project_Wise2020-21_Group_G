package com.station.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.AttributeConverter;

public class ListToStringConverter implements AttributeConverter<List<String>, String> {

	final String seperator=", ";
	@Override
	public String convertToDatabaseColumn(List<String> attribute) {
		String dbString=String.join(seperator, attribute);
		return dbString;
	}

	@Override
	public List<String> convertToEntityAttribute(String dbData) {
		List<String> entityString=new ArrayList<String>(Arrays.asList(dbData.split(seperator)));
		return entityString;
	}

}
