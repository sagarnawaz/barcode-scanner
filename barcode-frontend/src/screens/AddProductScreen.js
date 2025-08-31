import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { THEME } from '../utils/constants';
import { apiService } from '../services/api';

const AddProductScreen = ({ navigation, route }) => {
  const { barcode } = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    stock: '1'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return false;
    }
    if (!formData.price || isNaN(parseFloat(formData.price))) {
      Alert.alert('Error', 'Valid price is required');
      return false;
    }
    if (parseFloat(formData.price) <= 0) {
      Alert.alert('Error', 'Price must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const productData = {
        barcode: barcode,
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim() || 'No description available',
        category: formData.category.trim() || 'General',
        stock: parseInt(formData.stock) || 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const result = await apiService.createProduct(productData);
      
      if (result.success) {
        Alert.alert(
          'Success!',
          'Product added to database successfully!',
          [
            {
              text: 'Add to Cart',
              onPress: () => {
                // Navigate back to scan screen to scan again
                navigation.navigate('Scan');
              }
            },
            {
              text: 'Add Another Product',
              onPress: () => {
                setFormData({
                  name: '',
                  price: '',
                  description: '',
                  category: '',
                  stock: '1'
                });
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to add product: ' + result.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Product</Text>
        <Text style={styles.subtitle}>Barcode: {barcode}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Enter product name"
            placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price (₹) *</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            placeholder="0.00"
            placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Enter product description"
            placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={formData.category}
            onChangeText={(value) => handleInputChange('category', value)}
            placeholder="General"
            placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Stock Quantity</Text>
          <TextInput
            style={styles.input}
            value={formData.stock}
            onChangeText={(value) => handleInputChange('stock', value)}
            placeholder="1"
            placeholderTextColor={THEME.COLORS.TEXT_SECONDARY}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={THEME.COLORS.BACKGROUND} />
            ) : (
              <Text style={styles.submitButtonText}>Add Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Product Information</Text>
        <Text style={styles.infoText}>
          • Product name and price are required
        </Text>
        <Text style={styles.infoText}>
          • Description and category are optional
        </Text>
        <Text style={styles.infoText}>
          • Stock quantity defaults to 1
        </Text>
        <Text style={styles.infoText}>
          • Product will be available for scanning immediately
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: THEME.COLORS.PRIMARY,
    padding: THEME.SPACING.LG,
    alignItems: 'center',
  },
  title: {
    fontSize: THEME.FONT_SIZES.TITLE,
    fontWeight: 'bold',
    color: THEME.COLORS.BACKGROUND,
    marginBottom: THEME.SPACING.SM,
  },
  subtitle: {
    fontSize: THEME.FONT_SIZES.MD,
    color: THEME.COLORS.BACKGROUND,
    opacity: 0.9,
  },
  form: {
    padding: THEME.SPACING.LG,
  },
  inputGroup: {
    marginBottom: THEME.SPACING.LG,
  },
  label: {
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
    color: THEME.COLORS.TEXT_PRIMARY,
    marginBottom: THEME.SPACING.SM,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.COLORS.BORDER,
    borderRadius: THEME.BORDER_RADIUS.MD,
    padding: THEME.SPACING.MD,
    fontSize: THEME.FONT_SIZES.MD,
    backgroundColor: THEME.COLORS.SURFACE,
    color: THEME.COLORS.TEXT_PRIMARY,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: THEME.SPACING.XL,
  },
  button: {
    flex: 1,
    paddingVertical: THEME.SPACING.MD,
    borderRadius: THEME.BORDER_RADIUS.MD,
    alignItems: 'center',
    marginHorizontal: THEME.SPACING.XS,
  },
  cancelButton: {
    backgroundColor: THEME.COLORS.ERROR,
  },
  submitButton: {
    backgroundColor: THEME.COLORS.SUCCESS,
  },
  cancelButtonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
  },
  submitButtonText: {
    color: THEME.COLORS.BACKGROUND,
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
  },
  info: {
    backgroundColor: THEME.COLORS.SURFACE,
    margin: THEME.SPACING.LG,
    padding: THEME.SPACING.LG,
    borderRadius: THEME.BORDER_RADIUS.LG,
    borderLeftWidth: 4,
    borderLeftColor: THEME.COLORS.PRIMARY,
  },
  infoTitle: {
    fontSize: THEME.FONT_SIZES.MD,
    fontWeight: '600',
    color: THEME.COLORS.TEXT_PRIMARY,
    marginBottom: THEME.SPACING.MD,
  },
  infoText: {
    fontSize: THEME.FONT_SIZES.SM,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: THEME.SPACING.XS,
  },
});

export default AddProductScreen;
